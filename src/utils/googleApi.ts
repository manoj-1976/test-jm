import { useEffect, useState, useRef } from 'react';

declare global {
  interface Window {
    gapi: any;
    google: any;
  }
}

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const DISCOVERY_DOCS = [
  'https://sheets.googleapis.com/$discovery/rest?version=v4',
  'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
];
const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
].join(' ');

export function useGoogleApi() {
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const gapiInitialized = useRef(false);
  const gisInitialized = useRef(false);

  useEffect(() => {
    const loadGapi = () => {
      return new Promise<void>((resolve) => {
        if (window.gapi && gapiInitialized.current) {
          console.log('gapi already loaded');
          return resolve();
        }
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.onload = () => {
          window.gapi.load('client', () => {
            console.log('gapi client loaded');
            gapiInitialized.current = true;
            resolve();
          });
        };
        script.onerror = () => {
          setError('Failed to load Google API client script.');
          setIsInitializing(false);
          console.error('Failed to load Google API client script.');
          resolve();
        };
        document.body.appendChild(script);
      });
    };

    const loadGis = () => {
      return new Promise<void>((resolve) => {
        if (window.google && gisInitialized.current) {
          console.log('GIS already loaded');
          return resolve();
        }
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => {
          console.log('GIS client loaded');
          gisInitialized.current = true;
          resolve();
        };
        script.onerror = () => {
          setError('Failed to load Google Identity Services script.');
          setIsInitializing(false);
          console.error('Failed to load Google Identity Services script.');
          resolve();
        };
        document.body.appendChild(script);
      });
    };

    const initClient = async () => {
      try {
        await loadGapi();
        await loadGis();

        if (!window.gapi || !window.google) {
          setError('Google API scripts not loaded.');
          setIsInitializing(false);
          return;
        }

        await window.gapi.client.init({
          apiKey: API_KEY,
          discoveryDocs: DISCOVERY_DOCS,
        });

        console.log('Google API client initialized.');
        setIsInitializing(false);

      } catch (err: any) {
        console.error('Error initializing Google API client:', err);
        setError(`Failed to initialize Google API: ${err.details || err.message || JSON.stringify(err)}`);
        setIsInitializing(false);
      }
    };

    initClient();
  }, []);

  const getToken = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (window.gapi.client.getToken()?.access_token) {
        resolve(window.gapi.client.getToken().access_token);
        return;
      }
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (tokenResponse: any) => {
          if (tokenResponse && tokenResponse.access_token) {
            window.gapi.client.setToken(tokenResponse);
            resolve(tokenResponse.access_token);
          } else {
            reject(new Error('Failed to get access token.'));
          }
        },
        error_callback: (error: any) => {
          console.error('Google Auth Error:', error);
          setError(`Google authentication failed: ${error.details || error.message || JSON.stringify(error)}`);
          reject(new Error('Authentication failed.'));
        }
      });
      client.requestAccessToken();
    });
  };

  async function saveDataToSheet(range: string, values: any[][]) {
    try {
      const accessToken = await getToken();
      const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID;
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}:append?valueInputOption=USER_ENTERED`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ values }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error saving data to sheet:', errorData);
        throw new Error(`Failed to save data to sheet: ${errorData.error.message || JSON.stringify(errorData)}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error saving data to sheet:', error);
      setError(`Error saving data to sheet: ${(error as Error).message}`);
      throw error;
    }
  }

  async function uploadPdfToDrive(pdfBlob: Blob, fileName: string) {
    try {
      const accessToken = await getToken();
      const metadata = {
        name: fileName,
        mimeType: 'application/pdf',
        parents: [], // You can specify a folder ID here if needed
      };

      const formData = new FormData();
      formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
      formData.append('file', pdfBlob);

      const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error uploading PDF to Drive:', errorData);
        throw new Error(`Failed to upload PDF to Drive: ${errorData.error.message || JSON.stringify(errorData)}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error uploading PDF to Drive:', error);
      setError(`Error uploading PDF to Drive: ${(error as Error).message}`);
      throw error;
    }
  }

  return {
    isInitializing,
    error,
    saveDataToSheet,
    uploadPdfToDrive,
  };
} 
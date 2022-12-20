declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT: string;
        MAX_UPLOAD: string;
        SAVE_FOLDER_NAME: string;
        RANDOM_FILE_NAMES_LENGTH: string;
        BLOCKED_EXT: string;
        FTP_ENABLED: 'true' | 'false';
        FTP_URL: string;
        FTP_USER: string;
        FTP_PASSWORD: string;
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}
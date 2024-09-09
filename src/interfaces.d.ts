export interface Quiz {
  id: string | number;
  term: string;
  defination: string;
}

export interface Quizz {
  id: string | number;
  title: string;
  questions: Quiz[];
}

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initDataUnsafe: {
          user: {
            id: number;
            first_name: string;
            username: string;
          };
        };
        ready: () => void;
      };
    };
  }
}

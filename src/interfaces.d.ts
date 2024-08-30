export interface Quiz {
  id: string | number,
  term: string,
  defination: string,
}

export interface Quizz {
  id: string | number,
  title: string,
  questions: Quiz[],
}
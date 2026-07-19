export interface JudgeQAItem {
  id?: string;
  question: string;
  answer?: string;
  reasonForAsking?: string;
  idealAnswerFramework?: string;
}

export interface PitchDeckArtifacts {
  presenterNotes?: Record<number, string> | string[];
  judgeQA?: JudgeQAItem[];
  executiveSummary?: string;
  elevatorPitch?: string;
}

export interface PitchDeckRecord {
  id: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
  deck_json: any;
  artifacts?: PitchDeckArtifacts | null;
}

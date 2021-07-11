export class Question {
  constructor(id, type, text, options) {
    this.id = id;
    this.type = type;
    this.text = text;
    this.options = options;
  }
}

export class Option {
  constructor(text, isCorrect) {
    this.text = text;
    this.isCorrect = isCorrect;
  }
}

export class Quiz {
  constructor(questions, timeAllowed) {
    this.questions = questions;
    this.timeAllowed = timeAllowed;
  }
}

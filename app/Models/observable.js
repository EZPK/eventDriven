class Observable {
  constructor() {
    this.observers = [];
  }

  add(observer) {
    this.observers.push(observer);
  }

  remove(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}


class Observer {
  update(data) {
    // Réagir au changement d'état de l'observable
    console.log('Observer updated:', data);
  }
}


module.exports = { Observable, Observer };
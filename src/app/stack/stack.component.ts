import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService, Quiz, QuizState } from '../shared/quiz';
import { LocalStorageService } from '../shared';
import { swingStack, swingCard, ISwingCard } from '../shared/swing';
import { LocalStorage } from "../shared/local-storage/local-storage.class";

@Component({
  selector: 'stack',
  styles: [`` + require('!raw!sass!./stack.scss')],
  template: require('./stack.html')
})
export class StackComponent {
  public quiz: Quiz;
  public swingStack;
  public answeredLastCorrectly: boolean;
  public stackStates = QuizState;

  private _storage: LocalStorage;
  private _responses: boolean[];
  private _cards: ISwingCard[] = [];

  constructor(private route: ActivatedRoute,
              private service: QuizService,
              private router: Router,
              private storageService: LocalStorageService) {
    this._storage = this.storageService.setupStorage('stacks', {});
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = parseInt(params['id'], 10);
      this._responses = params['responses'] ?
        params['responses'].split('').map(response => response === '1') :
        [];
      this.service.getStack(id).subscribe(stack => this.quiz = stack.start(this._responses));
    });
    this.swingStack = swingStack({
      throwOutConfidence: (offset, element) => Math.min(Math.abs(offset) / (element.offsetWidth / 2), 1)
    });
  }

  addCard(index: number, card: ISwingCard) {
    this._cards[index] = card;
  }

  answer(response: boolean) {
    this.answeredLastCorrectly = this.quiz.setResponse(response);

    this._responses.push(response);
    this._storage.set(this.quiz.id, this._responses);
    if (this.quiz.state === QuizState.Complete) {
      this.router.navigate(['/result', this.quiz.id, this.quiz.getResponsesAsString()]);
    }
  }

  throwLeft() {
    this._cards[this.quiz.index].throwOut(swingCard.DIRECTION_LEFT, 0);
  }

  throwRight() {
    this._cards[this.quiz.index].throwOut(swingCard.DIRECTION_RIGHT, 0);
  }
}

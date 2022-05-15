import { Game } from './models/game';
import './style.css';

let game: Game | null = null;

window.onload = () => {
  const app = document.getElementById('app');
  if (!app) return;

  const score = document.createElement('p');
  app.appendChild(score);

  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 400;
  canvas.className = "canvas";
  app.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  game = new Game(ctx, score, canvas.width, canvas.height);


  setInterval(() => {
    if (game) game.gameLoop();
  }, 10);

  setInterval(() => {
    if (game) game.spawnWall();
  }, 3000);

  if (game) game.spawnWall();
  
};

window.onkeydown = ({ key }) => {
  if (game) game.keyInput(key);
};


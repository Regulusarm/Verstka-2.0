function startPlay(e){
  var audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  var key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if(!audio) return 
  audio.play()
  key.classList.add('playing')
  window.removeEventListener('keydown', startPlay)
  window.addEventListener('keydown', stopPlay)
}
function stopPlay(e) {
  var audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  var key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  audio.pause();
  key.classList.add('playing')
  window.removeEventListener('keydown', stopPlay)
  window.addEventListener('keydown', startPlay)
}  
function removeTransition(e) {
  if(e.propertyName !== 'transform') return
  this.classList.remove('playing')
}

const keys = document.querySelectorAll('.key');
window.addEventListener('keydown', startPlay )
keys.forEach(key => key.addEventListener('transitionend', removeTransition))


const secondHand = document.querySelector('.second-hand');
const minHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
function setDate() {
  const now = new Date();
  const seconds = now.getSeconds();
  const min = now.getMinutes();
  const hour = now.getHours();
  const secondsDegrees = ((seconds / 60) * 360 );
  const minDegrees = ((min / 60) * 360);
  const hourDegrees = ((hour / 12) * 360);
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
  minHand.style.transform = `rotate(${minDegrees}deg)`;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
};
setInterval (setDate, 1000)

const inputs = document.querySelectorAll('.inputs input');
function handleUpdate() {
  const suffix =  this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix)

}
inputs.forEach(input => input.addEventListener('change', handleUpdate))

const inventors = [
  { first:'Albert', last:'Einstein', year:1879, passed:1955 }, 
  { first:'Isaac', last:'Newton', year:1643, passed:1727 },
  { first:'Galileo', last:'Galilei', year:1564, passed:1642 },
  { first:'Marie', last:'Curie', year:1867, passed:1934 },
  { first:'Johannes', last:'Kepler', year:1571, passed:1630 },
  { first:'Nicolaus', last:'Copernicus', year:1473, passed:1543 },
  { first:'Max', last:'Plank', year:1858, passed:1974 }
]

const fifteen = inventors.filter(function(inventor) {
  if(inventor.year >= 1500 && inventor.year <= 1600) {
    return true; //keep it
  }
})
console.table(fifteen)

const fullNames = inventors.map(inventor => `${inventor.first} ${inventor.last}`)
console.log(fullNames)

const ordered = inventors.sort((a,b) => a.year > b.year ? 1 : -1)
console.table(ordered)

const totalYears = inventors.reduce((total, inventor) => {return total + (inventor.passed - inventor.year)},0)
console.log(totalYears)
  
const oldest = inventors.sort(function(a,b) {
  const lastGuy = a.passed - a.year;
  const nextGuy = b.passed - b.year;
  return lastGuy > nextGuy ? -1 : 1
})
console.table(oldest)
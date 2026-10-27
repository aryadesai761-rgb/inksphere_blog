const searchInput = document.getElementById('searchInput');
const cards = [...document.querySelectorAll('.story-card')];
const chips = [...document.querySelectorAll('.filter-chip')];
const noResults = document.getElementById('noResults');
let selectedCategory = 'All';

function filterStories() {
  const query = searchInput.value.trim().toLowerCase();
  let visible = 0;
  cards.forEach(card => {
    const matchesCategory = selectedCategory === 'All' || card.dataset.category === selectedCategory;
    const matchesSearch = (card.dataset.title + ' ' + card.dataset.category + ' ' + card.innerText).toLowerCase().includes(query);
    const show = matchesCategory && matchesSearch;
    card.hidden = !show;
    if (show) visible++;
  });
  noResults.hidden = visible !== 0;
}
searchInput.addEventListener('input', filterStories);
chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(item => item.classList.remove('active'));
  chip.classList.add('active');
  selectedCategory = chip.dataset.category;
  filterStories();
}));

document.querySelectorAll('.like-button').forEach(button => button.addEventListener('click', () => {
  const liked = button.getAttribute('aria-pressed') === 'true';
  button.setAttribute('aria-pressed', String(!liked));
  button.classList.toggle('liked', !liked);
  button.innerHTML = !liked ? '♥ <span>Liked</span>' : '♡ <span>Like</span>';
}));

document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('light');
  document.getElementById('themeToggle').textContent = document.body.classList.contains('light') ? '☾' : '☼';
});
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));
document.getElementById('newsletterForm').addEventListener('submit', event => {
  event.preventDefault();
  const email = document.getElementById('emailInput').value.trim();
  document.getElementById('formMessage').textContent = `Thanks! ${email} has been added for this demo.`;
  document.getElementById('emailInput').value = '';
});

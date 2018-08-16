var stripe = Stripe('pk_test_vSMRBW9hpWCGAIMuPWIATx55');
var elements = stripe.elements();

// Custom styling can be passed to options when creating an Element.
const style = {
  base: {
    // Add your base input styles here. For example:
    fontSize: '16px',
    color: "#32325d"
  },
  complete: {
    color: "green"
  }
};

const card = elements.create('card', {style});

card.mount('#card-element');

card.addEventListener('change', ({error}) => {
  console.log('card has changed')
  const displayError = document.getElementById('card-errors');
  if(error) {
    displayError.style.display = "block";
    displayError.textContent = error.message;
  } else {
    displayError.style.display = "none";
    displayError.textContent = '';
  }
});

const form = document.getElementById('checkout-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const {token, error} = await stripe.createToken(card);

  if (error) {
    const errorElement = document.getElementById('card-errors');
    errorElement.style.display = "block";
    errorElement.textContent = error.message;
  } else {
    stripeTokenHandler(token);
  }
});

const stripeTokenHandler = (token) => {
  const form = document.getElementById('checkout-form');
  const hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id);
  form.appendChild(hiddenInput);

  form.submit();
}

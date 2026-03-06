function showLogin(){
  document.getElementById('loginForm').classList.remove('hidden');
  document.getElementById('registerForm').classList.add('hidden');
  document.getElementById('loginTab').classList.add('active');
  document.getElementById('registerTab').classList.remove('active');
  document.getElementById('loginError').textContent='';
}

function showRegister(){
  document.getElementById('registerForm').classList.remove('hidden');
  document.getElementById('loginForm').classList.add('hidden');
  document.getElementById('registerTab').classList.add('active');
  document.getElementById('loginTab').classList.remove('active');
  document.getElementById('registerError').textContent='';
  document.getElementById('registerSuccess').textContent='';
}

function doLogin(){
  var username = document.getElementById('loginUsername').value.trim();
  var password = document.getElementById('loginPassword').value.trim();
  var errorEl  = document.getElementById('loginError');
  errorEl.textContent = '';

  if(!username || !password){
    errorEl.textContent = 'Please fill in all fields!';
    return;
  }

  errorEl.textContent = 'Connecting...';

  fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username, password: password })
  })
  .then(function(r){ return r.json(); })
  .then(function(data){
    if(data.success){
      localStorage.setItem('cw_user', JSON.stringify({
        name: data.user.name,
        username: data.user.username
      }));
      window.location.href = 'index.html';
    } else {
      errorEl.textContent = data.message;
    }
  })
  .catch(function(){
    errorEl.textContent = 'Server not running! Start backend first.';
  });
}

function doRegister(){
  var name     = document.getElementById('regName').value.trim();
  var username = document.getElementById('regUsername').value.trim();
  var password = document.getElementById('regPassword').value.trim();
  var confirm  = document.getElementById('regConfirm').value.trim();
  var errorEl  = document.getElementById('registerError');
  var successEl = document.getElementById('registerSuccess');
  errorEl.textContent = '';
  successEl.textContent = '';

  if(!name || !username || !password || !confirm){
    errorEl.textContent = 'Please fill in all fields!';
    return;
  }
  if(password !== confirm){
    errorEl.textContent = 'Passwords do not match!';
    return;
  }
  if(password.length < 4){
    errorEl.textContent = 'Password must be at least 4 characters!';
    return;
  }

  successEl.textContent = 'Creating account...';

  fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name, username: username, password: password })
  })
  .then(function(r){ return r.json(); })
  .then(function(data){
    if(data.success){
      successEl.textContent = 'Account created! Go to Login now!';
      setTimeout(function(){ showLogin(); }, 1500);
    } else {
      errorEl.textContent = data.message;
      successEl.textContent = '';
    }
  })
  .catch(function(){
    errorEl.textContent = 'Server not running! Start backend first.';
    successEl.textContent = '';
  });
}
/* Minimal Supabase RPC client. Only the public publishable/anon key belongs here.
   Participant tokens are private bearer credentials and stay in this browser. */
(function () {
  var cfg = window.__PUENTE_CONFIG__ || {};
  var enabled = !!(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY);
  var TOKEN_KEY = 'puente.participant.token.v1';

  function rpc(name, args) {
    if (!enabled) return Promise.reject(new Error('Supabase is not configured for this deployment.'));
    return fetch(cfg.SUPABASE_URL + '/rest/v1/rpc/' + encodeURIComponent(name), {
      method: 'POST',
      headers: {
        apikey: cfg.SUPABASE_ANON_KEY,
        Authorization: 'Bearer ' + cfg.SUPABASE_ANON_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(args || {})
    }).then(function (r) {
      if (!r.ok) return r.text().then(function (t) {
        var message = t;
        try { var j = JSON.parse(t); message = j.message || j.details || t; } catch (e) {}
        throw new Error(message);
      });
      return r.json();
    });
  }

  window.PuenteDB = {
    enabled: enabled,
    register: function (role, answers) {
      return rpc('puente_register', { p_role: role, p_answers: answers }).then(function (data) {
        if (!data || !data.participant_token) throw new Error('The database did not return a private return token.');
        try { window.localStorage.setItem(TOKEN_KEY, data.participant_token); }
        catch (e) { throw new Error('This browser cannot safely save your private return token. Enable local storage and try again.'); }
        return data;
      });
    },
    respond: function (accept) {
      var token = this.getToken();
      if (!token) return Promise.reject(new Error('No saved Puente return token was found in this browser.'));
      return rpc('puente_respond', { p_token: token, p_accept: !!accept });
    },
    status: function () {
      var token = this.getToken();
      if (!token) return Promise.reject(new Error('No saved Puente return token was found in this browser.'));
      return rpc('puente_status', { p_token: token });
    },
    getToken: function () {
      try { return window.localStorage.getItem(TOKEN_KEY); } catch (e) { return null; }
    },
    clearToken: function () {
      try { window.localStorage.removeItem(TOKEN_KEY); } catch (e) {}
    }
  };
})();

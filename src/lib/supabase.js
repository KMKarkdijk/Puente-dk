/* Minimal Supabase REST client, no dependencies. Uses ONLY the public anon key from
   config.js. Nothing in the app calls it yet; it is ready for when the app needs a database.
   Example: PuenteDB.insert('requests', { answers: {...} }) */
(function () {
  var cfg = window.__PUENTE_CONFIG__ || {};
  var enabled = !!(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY);
  function call(method, path, body, extra) {
    if (!enabled) return Promise.reject(new Error('Supabase is not configured'));
    var headers = Object.assign({
      apikey: cfg.SUPABASE_ANON_KEY,
      Authorization: 'Bearer ' + cfg.SUPABASE_ANON_KEY,
      'Content-Type': 'application/json'
    }, extra || {});
    return fetch(cfg.SUPABASE_URL + '/rest/v1/' + path, {
      method: method, headers: headers, body: body ? JSON.stringify(body) : undefined
    }).then(function (r) {
      if (!r.ok) return r.text().then(function (t) { throw new Error(t); });
      return r.status === 204 ? null : r.json();
    });
  }
  window.PuenteDB = {
    enabled: enabled,
    select: function (table, query) { return call('GET', table + (query ? '?' + query : '')); },
    insert: function (table, row) { return call('POST', table, row, { Prefer: 'return=minimal' }); }
  };
})();

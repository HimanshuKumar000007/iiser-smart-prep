/**
 * IISER SmartPrep - Mixpanel Analytics Integration (Client Snippet)
 * Supports standard HTML pages (landing, login, pay, pyqs, smart_notes, mock_tests).
 */
(function () {
  // 1. Official Mixpanel SDK Loader Snippet
  (function (f, b) {
    if (!b.__SV) {
      var e, g, i, h;
      window.mixpanel = b;
      b._i = [];
      b.init = function (e, f, c) {
        function g(a, d) {
          var b = d.split(".");
          2 == b.length && ((a = a[b[0]]), (d = b[1]));
          a[d] = function () {
            a.push([d].concat(Array.prototype.slice.call(arguments, 0)));
          };
        }
        var p = b;
        "undefined" !== typeof c ? (p = b[c] = []) : (c = "mixpanel");
        p.people = p.people || [];
        p.toString = function (a) {
          var d = "mixpanel";
          "mixpanel" !== c && (d += "." + c);
          a || (d += " (stub)");
          return d;
        };
        p.people.toString = function () {
          return p.toString(1) + ".people (stub)";
        };
        i = "disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders start_session_recording stop_session_recording people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(
          " "
        );
        for (h = 0; h < i.length; h++) g(p, i[h]);
        var s = "set_config reset register register_once unregister identify opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking".split(
          " "
        );
        for (h = 0; h < s.length; h++) g(p.people, s[h]);
        b._i.push([e, f, c]);
      };
      b.__SV = 1.2;
      e = f.createElement("script");
      e.type = "text/javascript";
      e.async = !0;
      e.src =
        "undefined" !== typeof MIXPANEL_CUSTOM_LIB_URL
          ? MIXPANEL_CUSTOM_LIB_URL
          : "file:" === f.location.protocol &&
            "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)
          ? "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js"
          : "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";
      g = f.getElementsByTagName("script")[0];
      g.parentNode.insertBefore(e, g);
    }
  })(document, window.mixpanel || []);

  // 2. Configuration & Initialization
  var token =
    window.MIXPANEL_TOKEN ||
    (typeof MIXPANEL_PROJECT_TOKEN !== "undefined"
      ? MIXPANEL_PROJECT_TOKEN
      : "") ||
    "";

  var isPlaceholder =
    !token ||
    token === "YOUR_MIXPANEL_PROJECT_TOKEN" ||
    token.includes("YOUR_MIXPANEL");

  var isInitialized = false;

  var initConfig = {
    autocapture: true,
    record_sessions_percent: 100,
    persistence: "localStorage",
    ignore_dnt: true,
    batch_requests: true,
  };

  if (window.MIXPANEL_REGION === "EU") {
    initConfig.api_host = "https://api-eu.mixpanel.com";
  }

  if (!isPlaceholder && window.mixpanel && typeof window.mixpanel.init === "function") {
    try {
      window.mixpanel.init(token, initConfig);
      isInitialized = true;
      if (
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1"
      ) {
        console.log("📊 Mixpanel initialized with token: " + token.substring(0, 6) + "...");
      }
    } catch (err) {
      console.warn("Mixpanel initialization error:", err);
    }
  } else {
    // Development or awaiting token setup
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      console.info(
        "📊 [Mixpanel] Project token is currently set to placeholder. Tracking runs in silent simulation mode. Set MIXPANEL_TOKEN in config.js or .env to activate live data."
      );
    }
  }

  // 3. User Identity Sync from LocalStorage
  function syncUserSession() {
    try {
      var userToken = localStorage.getItem("IAT_TOKEN");
      var userName = localStorage.getItem("currentUser");
      var userPlan = localStorage.getItem("IAT_PLAN") || "FREE";

      if (userToken && window.mixpanel && typeof window.mixpanel.identify === "function") {
        if (!isPlaceholder) {
          var userId = userName || userToken.substring(0, 16);
          window.mixpanel.identify(userId);
          window.mixpanel.people.set({
            $name: userName || "Student",
            Plan: userPlan.toUpperCase(),
            "Last Seen": new Date().toISOString(),
          });
        }
      }
    } catch (e) {
      // Ignore storage access errors
    }
  }

  // 4. Exposed Analytics API
  window.smartPrepAnalytics = {
    isConfigured: function () {
      return !isPlaceholder && isInitialized;
    },

    track: function (eventName, props) {
      var eventProps = Object.assign(
        {
          path: window.location.pathname,
          title: document.title,
          plan: (localStorage.getItem("IAT_PLAN") || "FREE").toUpperCase(),
        },
        props || {}
      );

      if (!isPlaceholder && window.mixpanel && typeof window.mixpanel.track === "function") {
        window.mixpanel.track(eventName, eventProps);
      } else if (
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1"
      ) {
        console.log("📊 [Mixpanel Track Simulated]", eventName, eventProps);
      }
    },

    identify: function (userId, traits) {
      if (!isPlaceholder && window.mixpanel && typeof window.mixpanel.identify === "function") {
        window.mixpanel.identify(userId);
        if (traits && window.mixpanel.people) {
          window.mixpanel.people.set(traits);
        }
      } else if (
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1"
      ) {
        console.log("📊 [Mixpanel Identify Simulated]", userId, traits);
      }
    },

    setUserProperties: function (traits) {
      if (!isPlaceholder && window.mixpanel && window.mixpanel.people) {
        window.mixpanel.people.set(traits);
      }
    },

    reset: function () {
      if (!isPlaceholder && window.mixpanel && typeof window.mixpanel.reset === "function") {
        window.mixpanel.reset();
      }
    },

    trackPageView: function (pageName, props) {
      this.track("Page Viewed", Object.assign({ page: pageName || document.title }, props || {}));
    },
  };

  // Run initial session sync
  syncUserSession();

  // Track initial page view automatically
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      window.smartPrepAnalytics.trackPageView(document.title);
    });
  } else {
    window.smartPrepAnalytics.trackPageView(document.title);
  }
})();

---
sidebar_position: 4
---

# FAQ

### The "credit usage" page is blank or shows a "This site can't be reached" error

**Cause**:
> The system previously had an incorrect permanent redirect rule (HTTP 301) that would incorrectly redirect `https` requests to `http`. Your browser may have cached this faulty redirect.

**Solution**:

> *   First, check the protocol in your browser's address bar. If it is `http`, manually change it to `https` and try accessing the page again.
> *   To permanently fix this, clear your browser's cache (specifically "Cached images and files") to remove the stored permanent redirect.

### `CoStrict` Plugin Fails to Redirect to the Chat Page After Successful Login

**Cause**:
> This is most likely caused by local proxy settings interfering with the extension's network connectivity.

**Diagnosing the Error**:

<details>
  <summary>Click on 'OUTPUT' next to the 'TERMINAL' tab, then select 'CoStrict' from the dropdown menu.</summary>

![img.png](FAQ-img/proxy-err.png)

</details>

> If you see a `fetch failed` error in the output, the problem is almost certainly related to your proxy.

**Solution**:

1.  In VS Code, press `Ctrl + Shift + P` to open the command palette, type `user settings`, and open your settings. If `http.proxy` is configured, verify that the value is correct or remove it.
2.  Close VS Code and turn off your proxy software (e.g., Charles, Fiddler, etc.).
3.  Open the Windows "Proxy settings" and ensure the system-wide proxy is turned off.
4.  Restart your proxy software (if needed) and then restart VS Code.
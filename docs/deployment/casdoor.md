---
sidebar_position: 5
---

# Login Configuration Guide

## Configuration Page

### Accessing the Configuration Page

Visit http://\{COSTRICT_BACKEND\}:\{PORT_CASDOOR\} to access the admin login page.

```commandline
Default account: admin
Default password: 123
```
![img.png](./img/casdoor/config-login-page.png)

Then enter the admin dashboard.

#### Adding an `oauth` Authentication Provider

Go to Authentication → Providers → `Oauth` (template).

![img.png](./img/casdoor/add-oauth.png)

Fill in the standard `oauth` information.

![img.png](./img/casdoor/edit-oauth.png)

![img.png](./img/casdoor/id-secret.png)

After editing, scroll to the bottom of the page and click `Save & Exit`.

### Adding an SMS Authentication Provider

First, go to Authentication → Providers → SMS (template).

![img.png](./img/casdoor/add-sms.png)

You only need to configure the region node settings.

![img.png](./img/casdoor/config-sms.png)

### Login Configuration

First, let's look at the normally enabled user login page.

![img.png](./img/casdoor/login-page.png)

Password login is for testing purposes and includes a built-in account that can be used directly.

```commandline
Account: demo
Password: test123
```

To configure login: go to Authentication → Applications → loginApp (template).

![img.png](./img/casdoor/config-login.png)

First, modify the login page icon.

![img_1.png](./img/casdoor/edit-login-logo.png)

Click the delete button to remove the password login method.

![img.png](./img/casdoor/remove-password-login.png)

You can also remove the oauth login method (SMS verification cannot be removed).

![img.png](./img/casdoor/remove-oauth-login.png)

After configuration, scroll to the bottom of the page and click `Save & Exit`.

## Organization Configuration

> This section is mainly used to configure icons and title names.

![img.png](./img/casdoor/organization.png)

![img.png](./img/casdoor/edit-organization.png)

Please ensure the display name in `built-in` matches the user-group name, and replace `logo` and `Organization Favicon` with your own.
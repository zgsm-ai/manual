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
![descript](./img/casdoor/image1.png)

Then enter the admin dashboard.

#### Adding an `oauth` Authentication Provider

Go to Identity → Providers → `Oauth` (template).

![descript](./img/casdoor/image2.png)

Fill in the standard `oauth` information.

![descript](./img/casdoor/image3.png)

![descript](./img/casdoor/image4.png)

After editing, scroll to the bottom of the page and click `Save & Exit`.

### Adding an SMS Authentication Provider

First, go to Identity → Providers → SMS (template).

![descript](./img/casdoor/image5.png)

You only need to configure the region node settings.

![descript](./img/casdoor/image6.png)

### Login Configuration

First, let's look at the normally enabled user login page.

![descript](./img/casdoor/image7.png)

Password login is for testing purposes and includes a built-in account that can be used directly.

```commandline
Account: demo
Password: test123
```

To configure login: go to Identity → Applications → loginApp (template).

![descript](./img/casdoor/image8.png)

First, modify the login page icon.

![descript](./img/casdoor/image9.png)

Click the delete button to remove the password login method.

![descript](./img/casdoor/image10.png)

You can also remove the oauth login method (SMS verification cannot be removed).

![descript](./img/casdoor/image11.png)

After configuration, scroll to the bottom of the page and click `Save & Exit`.

## Organization Configuration

> This section is mainly used to configure icons and title names.

![descript](./img/casdoor/image12.png)

![descript](./img/casdoor/image13.png)

Please ensure the display name in `built-in` matches the user-group name, and replace `logo` and `Organization Favicon` with your own.
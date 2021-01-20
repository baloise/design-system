# Baloise UI-Library

[![now](https://badgen.net/badge/icon/now?icon=now&label)](https://ui-library.baloise.vercel.app/)
![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

The UI-Libary is an open source project for styling awesome web applications that follow the Baloise corporate styling guidelines.

- [Why UI-Library](introduction/why.md)
- [Architecture](introduction/architecture.md)
- [Installation](introduction/installation.md)

## Ecosytem

| Library                                    | Status                                                                                                                                   | Description                                                |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| [UI Library](introduction/html5)     | [![npm version](https://badge.fury.io/js/%40baloise%2Fui-library.svg)](https://badge.fury.io/js/%40baloise%2Fui-library)                 | Core library build with web components and global styling. |
| [UI Library Vue](introduction/vue)         | [![npm version](https://badge.fury.io/js/%40baloise%2Fui-library-vue.svg)](https://badge.fury.io/js/%40baloise%2Fui-library-vue)         | Vue component library based on the the core library.       |
| [UI Library Angular](introduction/angular) | [![npm version](https://badge.fury.io/js/%40baloise%2Fui-library-angular.svg)](https://badge.fury.io/js/%40baloise%2Fui-library-angular) | Angular component library based on the the core library.   |
| [UI Library Utils](utilities/installation) | [![npm version](https://badge.fury.io/js/%40baloise%2Fui-library-utils.svg)](https://badge.fury.io/js/%40baloise%2Fui-library-utils)     | Utilities like filters.                                    |
| [UI Library Testing](testing/installation) | [![npm version](https://badge.fury.io/js/%40baloise%2Fui-library-testing.svg)](https://badge.fury.io/js/%40baloise%2Fui-library-testing) | Testing library with accessors for each component.         |

## Framework Support

<table>
  <thead>
    <tr>
    <th><img style="width: 48px;" src="https://vuejs.org/images/logo.png" data-origin="https://vuejs.org/images/logo.png" alt="Vue"></th>
    <th><img style="width: 48px;" src="https://angular.io/assets/images/logos/angular/angular.svg" data-origin="https://angular.io/assets/images/logos/angular/angular.svg" alt="Vue"></th>
    </tr>
  </thead>
<tbody>
<tr>
<td><strong>Vue.js</strong><br>2.x.x ✔</td>
<td><strong>Angular</strong><br>10.2.x ✔</td>
</tr>
</tbody>
</table>

## Browser Support

| ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE9](https://raw.githubusercontent.com/alrra/browser-logos/main/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Chrome**<br />Last 2 versions ✔                                                                   | **Firefox**<br />Last 2 versions ✔                                                                     | **Safari**<br />Last 2 versions ✔                                                                   | **Edge** (Chromium)<br />Last 2 versions ✔                                                    | **IE9**<br /> Enabled with pollyfills. Only functional.                                                                                |

For more detail go to [Stencil - Browser Support](https://stenciljs.com/docs/browser-support).

## Release Notes

Detailed release notes for each version are available on [GitHub](https://github.com/baloise/ui-library/blob/master/CHANGELOG.md).

## Contributors

This project exists thanks to all the people who contribute.

<section class="bal-app">
    <div id="docs-contributors" class="docs-contributors"></div>
</section>

<script type="text/javascript">
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth();
    var d = today.getDate();
    var dateString = "" + d + "." + m + "." + y;
    var storageKey = "bal-ui-library";
    var jsonString = localStorage.getItem(storageKey);

    function render(html) {
        document.getElementById("docs-contributors").innerHTML = html
    }
    
    function loadContributors() {
        var url = "https://api.github.com/repos/baloise/ui-library/contributors";
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var contributors = JSON.parse(xhttp.responseText)
                    .filter(function (c) {
                        return c.type === "User";
                    })
                    .map(function (c) {
                        var image = "<a href=\"" + c.html_url + "\" target=\"_blank\">"
                            + "<figure class=\"image is-64x64 has-tooltip\" data-tooltip=\"" + c.login + "\">"
                            + "<img class=\"is-rounded\" src=\""
                            + c.avatar_url 
                            + "\" alt=\""
                            + c.login 
                            + "\"></figure></a>";
                        return "<div class=\"docs-contributor\">" + image + "</div>";
                    }).join("");
    
                localStorage.setItem(storageKey, JSON.stringify({ date: dateString, html: contributors }))
                render(contributors)
            } else {
                render("")
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }

    if(jsonString) {
        var data = JSON.parse(jsonString);
        if(data.date === dateString) {
            render(data.html)
        } else {
            loadContributors();
        }
    } else {
        loadContributors();
    }

</script>

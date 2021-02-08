# Baloise UI Library

**Learn everything you need to start using the Baloise UI Library**

The UI-Libary is an open source project for styling awesome web applications that follow the Baloise corporate styling guidelines.

## Get started

|  <span style="font-size: 2.5em;">🧰</span>   | <span style="font-size: 2.5em;">💡</span> |  <span style="font-size: 2.5em;">🏗️</span>   |
| :------------------------------------------: | :---------------------------------------: | :------------------------------------------: |
| [Installation](introduction/installation.md) |   [Why UI-Library](introduction/why.md)   | [Architecture](introduction/architecture.md) |

## Ecosytem

| Library                                    | Status                                                                                                                                   | Description                                                |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| [UI Library](introduction/html5)           | [![npm version](https://badge.fury.io/js/%40baloise%2Fui-library.svg)](https://badge.fury.io/js/%40baloise%2Fui-library)                 | Core library build with web components and global styling. |
| [UI Library Vue](introduction/vue)         | [![npm version](https://badge.fury.io/js/%40baloise%2Fui-library-vue.svg)](https://badge.fury.io/js/%40baloise%2Fui-library-vue)         | Vue component library based on the the core library.       |
| [UI Library Angular](introduction/angular) | [![npm version](https://badge.fury.io/js/%40baloise%2Fui-library-angular.svg)](https://badge.fury.io/js/%40baloise%2Fui-library-angular) | Angular component library based on the the core library.   |
| [UI Library Utils](utilities/installation) | [![npm version](https://badge.fury.io/js/%40baloise%2Fui-library-utils.svg)](https://badge.fury.io/js/%40baloise%2Fui-library-utils)     | Utilities like filters.                                    |
| [UI Library Testing](testing/installation) | [![npm version](https://badge.fury.io/js/%40baloise%2Fui-library-testing.svg)](https://badge.fury.io/js/%40baloise%2Fui-library-testing) | Testing library with accessors for each component.         |

## Framework Support

<table>
  <thead>
    <tr>
    <th><img style="width: 64px;" src="https://vuejs.org/images/logo.png" data-origin="https://vuejs.org/images/logo.png" alt="Vue"></th>
    <th><img style="width: 64px;" src="https://angular.io/assets/images/logos/angular/angular.svg" data-origin="https://angular.io/assets/images/logos/angular/angular.svg" alt="Vue"></th>
    </tr>
  </thead>
<tbody>
<tr>
<td>
    <strong>Vue.js</strong><br>
    2.x.x ✔<br><br>
    <a href="#/introduction/vue">Documentation</a>
</td>
<td>
    <strong>Angular</strong><br>
    10.2.x ✔<br><br>
    <a href="#/introduction/angular">Documentation</a>
</td>
</tr>
</tbody>
</table>

## Browser Support

| ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE11](https://raw.githubusercontent.com/alrra/browser-logos/main/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Chrome**<br />Last 2 versions ✔<br /><br />                                                       | **Firefox**<br />Last 2 versions ✔<br /><br />                                                         | **Safari**<br />Last 2 versions ✔<br /><br />                                                       | **Edge** (Chromium)<br />Last 2 versions ✔<br /><br />                                        | **IE11**<br /> Enabled with pollyfills.<br /> Only functional.                                                                          |

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

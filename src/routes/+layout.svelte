<script>
  import { onMount } from "svelte";
  import "../app.postcss";
  import '../styles/hackernews.css';
  import { ndk } from "$lib/nostr";

  export const prerender = true;
  let loaded = false;

  onMount(async () => {
    // const accept = confirm("This project has not been released, this is only for development purposes.");
    // if (accept == false) {
    //   throw new Error("User did not accept");
    // }
    await ndk.connect();
    loaded = true;
  })
</script>

<center>
  <table
    id="hnmain"
    border="0"
    cellpadding="0"
    cellspacing="0"
    width="85%"
    bgcolor="#F6F6EF"
  >
    <tbody>
      <tr>
        <td bgcolor="#FF6600">
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="padding:2px"
          >
            <tbody>
              <tr>
                <td style="width:18px;padding-right:4px">
                  <a href="/" /><img
                    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9InJnYigyNTUsIDEwMiwgMCkiPjwvcmVjdD4KICA8cGF0aCBkPSJNIDUwIDc3IEwgNTAgNTAgIiBmaWxsPSJub25lIiBzdHJva2U9InJnYigyNTUsIDI1NSwgMjU1KSIgc3Ryb2tlLXdpZHRoPSI4Ljc4NjYyMTUwNzE5NzI5IiBzdHJva2UtbGluZWNhcD0iYnV0dCI+CiAgPC9wYXRoPgogIDxwYXRoIGQ9Ik0gOTQuOTMwNTY3MzE1ODM0MDQgMzUuNjIyNzQ1NTEzOTE2MDE2IEwgNzEuMjQ1NDgzMzk4NDM3NSA3MS4yNDU0ODMzOTg0Mzc1ICIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2IoMjU1LCAyNTUsIDI1NSkiIHN0cm9rZS13aWR0aD0iOC43ODY2MjE1MDcxOTcyOSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIDEgLTIxLjI0NTUgLTIxLjI0NTUpIj4KICA8L3BhdGg+CiAgPHBhdGggZD0iTSAtNzguOTMwNTY3MzE1ODM0MDQgMzYuMTcwMjgwNDU2NTQyOTcgTCAtNTUuNjcxMTg4MzU0NDkyMTkgNzEuNzkzMDA2ODk2OTcyNjYgIiBmaWxsPSJub25lIiBzdHJva2U9InJnYigyNTUsIDI1NSwgMjU1KSIgc3Ryb2tlLXdpZHRoPSI4Ljc4NjYyMTUwNzE5NzI5IiBzdHJva2UtbGluZWNhcD0iYnV0dCIgdHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgMSAxMDUuMzk2IC0yMS43MjEzKSI+CiAgPC9wYXRoPgogIDxyZWN0IHRyYW5zZm9ybT0iIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjIzLjc0MjU5MTAyNDU1NTQ2MyIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9Im5vbmUiIGZpbGw9IiNGRjY2MDAiIHN0cm9rZS1vcGFjaXR5PSIxIiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiA+CiAgPC9yZWN0Pgo8L3N2Zz4K"
                    width="18"
                    height="18"
                    style="border:1px white solid;display:block"
                    alt="svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9InJnYigyNTUsIDEwMiwgMCkiPjwvcmVjdD4KICA8cGF0aCBkPSJNIDUwIDc3IEwgNTAgNTAgIiBmaWxsPSJub25lIiBzdHJva2U9InJnYigyNTUsIDI1NSwgMjU1KSIgc3Ryb2tlLXdpZHRoPSI4Ljc4NjYyMTUwNzE5NzI5IiBzdHJva2UtbGluZWNhcD0iYnV0dCI+CiAgPC9wYXRoPgogIDxwYXRoIGQ9Ik0gOTQuOTMwNTY3MzE1ODM0MDQgMzUuNjIyNzQ1NTEzOTE2MDE2IEwgNzEuMjQ1NDgzMzk4NDM3NSA3MS4yNDU0ODMzOTg0Mzc1ICIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2IoMjU1LCAyNTUsIDI1NSkiIHN0cm9rZS13aWR0aD0iOC43ODY2MjE1MDcxOTcyOSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIDEgLTIxLjI0NTUgLTIxLjI0NTUpIj4KICA8L3BhdGg+CiAgPHBhdGggZD0iTSAtNzguOTMwNTY3MzE1ODM0MDQgMzYuMTcwMjgwNDU2NTQyOTcgTCAtNTUuNjcxMTg4MzU0NDkyMTkgNzEuNzkzMDA2ODk2OTcyNjYgIiBmaWxsPSJub25lIiBzdHJva2U9InJnYigyNTUsIDI1NSwgMjU1KSIgc3Ryb2tlLXdpZHRoPSI4Ljc4NjYyMTUwNzE5NzI5IiBzdHJva2UtbGluZWNhcD0iYnV0dCIgdHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgMSAxMDUuMzk2IC0yMS43MjEzKSI+CiAgPC9wYXRoPgogIDxyZWN0IHRyYW5zZm9ybT0iIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjIzLjc0MjU5MTAyNDU1NTQ2MyIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9Im5vbmUiIGZpbGw9IiNGRjY2MDAiIHN0cm9rZS1vcGFjaXR5PSIxIiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiA+CiAgPC9yZWN0Pgo8L3N2Zz4K"
                  />
                </td>
                <td style="line-height:12pt;height:10px">
                  <span class="pagetop">
                    <b class="hnname">
                      <a data-sveltekit-reload href="/">Hacker News</a>
                    </b>

                    <!--<a href="/">new</a>
                    |
                    <a href="/">past</a>
                    |
                    <a href="/">comments</a>
                    |
                    <a href="/">ask</a>
                    |
                    <a href="/">show</a>
                    |
                    <a href="/">jobs</a>-->
                    |
                    <a data-sveltekit-reload href="/new">submit</a>
                  </span>
                </td>
                <td style="text-align:right;padding-right:4px">
                  <span class="pagetop">
                    <!--
                    <a href="#" on:click={loginHandler}>login</a>
                    <a href="#" >logout</a>
                    -->
                    <a data-sveltekit-reload href="/settings">settings</a>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr id="pagespace" title="" style="height:10px">
        <td />
      </tr>
      {#if loaded === false}
      <noscript>Please enable javascript to view this page...</noscript>
      <p style="color:black;display:none;">Loading...</p>
      {:else if loaded === true}
      <slot />
      {/if}
      <tr>
        <td>
          <img
            src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
            height="10"
            width="0"
            alt="AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
          />
          <table width="100%" cellspacing="0" cellpadding="1">
            <tbody>
              <tr>
                <td bgcolor="#FF6600" />
              </tr>
            </tbody>
          </table>
          <br />
          <center>
            <span class="yclinks"
              ><a href="/faq">FAQ</a> |
              <a href="https://f9ofwt.click/github">Github</a></span
            >
            <br />
            <div></div>
            <span style="color:black;"><a href="https://nostrne.ws">nostrne.ws</a> by <a href="https://f9ofwt.click" class="text-black hover:text-black">f9ofwt</a></span>
            <div></div>
            <br />
            <form action="//hn.algolia.com" />
            <label for="q">Search</label>:<input
              type="text"
              name="q"
              size="17"
              autocorrect="off"
              spellcheck="false"
              autocapitalize="off"
              autocomplete="false"
              value=""
              aria-label="Search"
            />
          </center>
        </td>
      </tr>
    </tbody>
  </table>
</center>


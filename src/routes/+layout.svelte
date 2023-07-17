<script>
  import { onMount } from "svelte";
  import "../app.postcss";
  import "../styles/hackernews.css";
  import { ndk } from "$lib/nostr";

  export const prerender = true;
  let loaded = false;

  onMount(async () => {
    await ndk.connect();
    loaded = true;
  });
</script>

<svelte:head>
  <title>Nostr News</title>
  <meta name="description" content="A nostr-based hackernews alternative." />
  <meta name="keywords" content="nostr,hackernews" />
</svelte:head>

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
                  <a data-sveltekit-reload href="/"><img
                    src="/logo.svg"
                    width="28"
                    height="28"
                    style="border:1px white solid;display:block"
                    alt="logo"
                  />
                  </a>
                </td>
                <td style="line-height:12pt;height:10px">
                  <span class="pagetop">
                    <b class="hnname">
                      <a data-sveltekit-reload href="/">Nostr News</a>
                    </b>

                    <a data-sveltekit-reload href="/?sort=zaps">zaps</a>
                    |
                    <a data-sveltekit-reload href="/new">submit</a>
                    <!--
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
                  </span>
                </td>
                <td style="text-align:right;padding-right:4px">
                  <span class="pagetop">
                    <!--
                    <a href="#" on:click={loginHandler}>login</a>
                    <a href="#" >logout</a>
                    -->
                    <!--<a data-sveltekit-reload href="/settings">settings</a>-->
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
            <div />
            <span style="color:black;font-size:10px;"
              ><a href="https://nostrne.ws">nostrne.ws</a> by
              <a href="https://f9ofwt.click" class="text-black hover:text-black"
                >f9ofwt</a
              ></span
            >
            <br>
            <span style="color:black;font-size:10px;">Logo based on <a href="https://github.com/mbarulli/nostr-logo">a design from mbarulli</a></span>
            <div />
            <br />
            <!--
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
            />-->
          </center>
        </td>
      </tr>
    </tbody>
  </table>
</center>

<script lang="ts">
  import { onMount } from "svelte";
  import { dateFormatter, formatPostContent, getDomain, formatNumber } from "../lib/utils";
  import { getCommentCount, getProfile, ndk, upvote, zap } from "../lib/nostr";
  import "../styles/hackernews.css";
  import { cache } from "$lib/cache";

  export const prerender = true;

  let data: any[] = [];
  let page = 1;
  let loaded: boolean = false;
  let sort: "upvotes" | "zaps" = "upvotes";

  async function load() {
    const newData = await cache.get(page, sort);
    if (newData.error) {
      return alert(newData.error);
    } else {
      data = await newData.data;
    }
  }

  async function loadMore() {
    loaded = false;
    try {
      page++;
      const newData = await cache.get(page, sort);
      if (newData.error) {
        return alert(newData.error);
      } else {
        data.push(...newData.data);
        data = data;
      }
    } catch (err) {
      console.error(err);
    } finally {
      loaded = true;
    }
  }

  onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    let sortParam: string | null = urlParams.get("sort");
    if (sortParam !== null) {
      if (sortParam === "zaps") {
        sort = "zaps";
      }
    }

    await load();
    loaded = true;
  });
</script>

<div />
<tr>
  <td>
    <table border="0" cellpadding="0" cellspacing="0">
      <tbody>
        {#each data as item, i}
          <tr id={`_${item.ID}`} class="athing">
            <td align="right" valign="top" class="title"
              ><span class="rank">{i + 1}.</span></td
            >
            <td valign="top" class="votelinks">
              <center>
                <a
                  id="up"
                  href="#"
                  on:click={async () => {
                    let r = await upvote(item.ID);
                    if (r === false) {
                      alert(
                        "Failed to react, note that we currently only support nip07"
                      );
                    } else if (r === true) {
                      alert("Posted reaction successfully!");
                    }
                  }}
                >
                  <div class="votearrow" title="upvote" /></a
                >
              </center>
            </td>
            <td class="title"
              ><span class="titleline"
                ><a
                  href={formatPostContent(item.Content).url === undefined
                    ? `/item?id=${item.ID}`
                    : formatPostContent(item.Content).url}
                  rel="noreferrer">{formatPostContent(item.Content).title}</a
                >
                {#if formatPostContent(item.Content).url !== undefined}
                  <span class="sitebit comhead"
                    >(<a
                      ><span class="sitestr"
                        >{getDomain(formatPostContent(item.Content).url)}</span
                      ></a
                    >)
                  </span>
                {/if}</span
              ></td
            >
          </tr>
          <tr id={`_${item.ID}`}>
            <td colspan="2" />
            <td class="subtext"
              ><span class="subline"
                >
                {#if sort === "upvotes"}
                <span class="score">{item.upvoteCount} points</span>
                {:else if sort === "zaps"}
                <span class="score">{formatNumber(item.zapSats)} sats</span>
                {/if}
                by
                <a href={`nostr:${item.PubKey}`} class="hnuser">
                  {#await getProfile(item.PubKey)}loading{:then result}{result
                      ?.profile?.name}{/await}
                </a>

                <span>{dateFormatter(item.CreatedAt)}</span> <span /> |
                <!--<a
                on:click={async () => {
                  let r = await zap(item.ID);
                  if (r === false) {
                    alert(
                      "Failed to zap, note that we currently only support nip07"
                    );
                  } else if (r === true) {
                    alert("Zapped successfully!");
                  }
                }}
                href="#">zap</a>
                |
                <a href="#">hide</a>
                | -->
                <a
                  href="#"
                  on:click={() =>
                    alert(
                      `the cache server found this post on the following relay(s): ${item.Relays}`
                    )}>relays</a
                >
                |
                <a href={`/item?id=${item.ID}`}>
                  {#await getCommentCount(item.ID, item.PubKey)}loading{:then result}{result}
                    comments{/await}
                </a>
              </span></td
            >
          </tr>
          <tr id={`_${item.ID}`} class="spacer" style="height:5px">
            <td />
          </tr>
        {/each}

        <tr class="spacer" style="height:5px">
          <td />
        </tr>
        <tr class="morespace" style="height:10px">
          <td />
        </tr>
        <tr>
          <td colspan="2" />
          <td class="title">
            {#if loaded === false}
              <span>Loading...</span>
            {:else}
              <a on:click={loadMore} class="morelink" rel="next">More</a>
            {/if}
          </td>
        </tr>
      </tbody>
    </table>
  </td>
</tr>

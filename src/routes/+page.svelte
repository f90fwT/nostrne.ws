<script lang="ts">
  import { onMount } from "svelte";
  import { dateFormatter, formatPostContent } from "../lib/utils";
  import { getCommentCount, getProfile, ndk } from "../lib/nostr";
  import "../styles/hackernews.css";
  import { cache } from "$lib/cache";

  export const prerender = true;

  let data: any[] = [];
  let page = 1;
  let loaded: boolean = false;

  async function load() {
    const newData = await cache.get(page);
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
      const newData = await cache.get(page);
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
    await load();
    loaded = true;
  });
</script>

<svelte:head>
  <title>Nostr News</title>
  <meta name="description" content="A description" />
</svelte:head>

{#if loaded === false}
  <span>Loading...</span>
{/if}
<div />
<tr>
  <td>
    <table border="0" cellpadding="0" cellspacing="0">
      <tbody>
        <!-- something like this -->
        {#each data as item, i}
          <tr id={`_${item.ID}`} class="athing">
            <td align="right" valign="top" class="title"
              ><span class="rank">{i + 1}.</span></td
            >
            <td valign="top" class="votelinks">
              <center>
                <a id="up" href={`/item?id=${item.ID}`}>
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
                <!--<span class="sitebit comhead"
                        >(<a
                          href="https://news.ycombinator.com/from?site=devpod.sh"
                          ><span class="sitestr">devpod.sh</span></a
                        >)</span
                      ></span
                    >--></span
              ></td
            >
          </tr>
          <tr id={`_${item.ID}`}>
            <td colspan="2" />
            <td class="subtext"
              ><span class="subline"
                ><span class="score" id="score_36407477"
                  >{item.upvoteCount} points</span
                >
                by
                <a href={`nostr:${item.PubKey}`} class="hnuser">
                  {#await getProfile(item.PubKey)}loading{:then result}{result
                      ?.profile?.name}{/await}
                </a>
                <!-- TODO Set profile name here -->

                <span>{dateFormatter(item.CreatedAt)}</span> <span /> |
                <a href="#">hide</a>
                |
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
                <!-- TODO Set comments number -->
              </span></td
            >
          </tr>
          <tr id={`_${item.ID}`} class="spacer" style="height:5px">
            <td />
          </tr>
        {/each}
        <!---->

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

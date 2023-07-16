<script lang="ts">
    import Comment from './Comment.svelte';
    import { getComments, getProfile, ndk } from "$lib/nostr";
    import { dateFormatter, removeDuplicateComments } from "$lib/utils";
    import type { NDKEvent, NDKFilter } from "@nostr-dev-kit/ndk";
    import { onMount } from "svelte";
    import SvelteMarkdown from 'svelte-markdown';

    export let above: NDKEvent;
    export let event: NDKEvent;
    export let ind: number;

    let loaded = false;
    let collapsed = false;
    let comments = [];

    async function start() {
      const filter: NDKFilter = { kinds: [1], ["#e"]: [event.id,]/*, ["#p"]: [event.pubkey,]*/, };
      const data: Set<NDKEvent> = await ndk.fetchEvents(filter);
      comments = data;
      removeDuplicateComments(event, ind);
      loaded = true;
    }

    start();

</script>


{#if loaded}
<tr class="athing comtr" id={`_Comment_${event.id}_${ind }`}
  ><td
    ><table border="0">
      <tbody
        ><tr>
          <td class="ind" style="width:{ind*2}rem;"
            ><img src="s.gif" height="1" width="0" /></td
          ><td valign="top" class={`${collapsed && "invisable"} votelinks`}>
            <center
              ><a
                id="up_36723116"
                href="vote?id=36723116&amp;how=up&amp;goto=item%3Fid%3D36722823"
                ><div class="votearrow" title="upvote" /></a
              ></center
            >
          </td><td class="default"
            ><div style="margin-top:2px; margin-bottom:-10px;">
              <span class="comhead">
                <a href={`nostr://${event?.pubkey}`} class="hnuser">{#await getProfile(event.pubkey)}loading{:then result}{result.profile.name}{/await}</a>
                <span class="age" title="2023-07-14T12:45:06"
                  ><a href="item?id=36723116">{dateFormatter(event.created_at)}</a></span
                > <span id="unv_36723116" />
                <span class="navs">
                  <a
                    class="togg clicky select-none cursor-pointer"
                    id="36723116"
                    n="6"
                    on:click={() => collapsed = !collapsed}
                    >{#if !collapsed}[–]{:else if collapsed}[more]{/if}</a
                  ><span class="onstory" />
                </span>
              </span>
            </div>
            <br />
            {#if !collapsed}
            <div style="color:black;font-size:12px;" class="comment">
                <span class="commtext c00">
                  <SvelteMarkdown source={event.content.replace(/\n/g, "\n\n")} />
                  <div class="reply">
                    <p>
                        <u
                          ><a
                            data-sveltekit-reload
                            style="color:black;display:block;font-size:10px;"
                            href={`/item?id=${event.id}`}
                            >reply</a
                          ></u
                        >
                    </p>
                  </div></span
                >
                </div>
            {/if}
</td
          ></tr
        >
      </tbody>
    </table></td
  ></tr
>

<div class={`${collapsed && "hidden"}`}>
{#each comments as comment}
<Comment above={event} event={comment} ind={ind+1} />
{/each}
</div>


{:else}
<p>Loading...</p>
{/if}

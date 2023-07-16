<script lang="ts">
  import { goto } from "$app/navigation";
  import { getComments, getProfile, ndk, addComment, upvote } from "$lib/nostr";
  import { dateFormatter, formatPostContent, removeDuplicateComments } from "$lib/utils";
  import type { NDKEvent } from "@nostr-dev-kit/ndk";
  import Comment from "../../components/Comment.svelte";
  import SvelteMarkdown from 'svelte-markdown'
  import "../../styles/hackernews.css";
  import {
    validateEvent,
    verifySignature,
    nip19,
    getEventHash,
    getBlankEvent,
  } from "nostr-tools";
  import { onMount } from "svelte";

  let commentContent = "";
  let comments = [];
  export const prerender = true;
  let event: NDKEvent | null | undefined = undefined;

  const addCommentHandler = async () => {
    let content = commentContent;
    commentContent = "";
    const result = await addComment(event, content);
    if (result == false) {
      alert(
        "Failed to comment message, note that we currently only support nip07"
      );
    } else if (result == true) {
      alert("Posted comment successfully!");
    }
  };

  const upvoteHandler = async () => {
    const result = await upvote(event);
    if (result == false) {
      alert("Failed to react, note that we currently only support nip07");
    } else if (result == true) {
      alert("Posted reaction successfully!");
    }
  };

  onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    let id: string | null = urlParams.get("id");

    if (id === null) {
      return (window.location.href = "/404");
    } else if (!id?.startsWith("nevent")) {
      //id = nip19.noteEncode(id);
    }

    event = await ndk.fetchEvent(id);
    if (event === undefined || event === null) {
      window.location.href = "/404";
    } else {
      comments = await getComments(event.id, event.pubkey);
      removeDuplicateComments(event, 0);
    }
  });
</script>

{#if event === null}
  <h1>Event</h1>
  <p>Not Found</p>
{:else if event === undefined}
  <p>Loading...</p>
{:else}
  <td
    ><table class="fatitem" border="0">
      <tbody
        ><tr class="athing" id="36722823">
          <td align="right" valign="top" class="title"><span class="rank" /></td
          >
          <td valign="top" class="votelinks"
            ><center
              ><a href="#" on:click={upvoteHandler}
                ><div class="votearrow" title="upvote" /></a
              ></center
            ></td
          ><td class="title"
            ><span class="titleline"
              ><a
                href={formatPostContent(event.content).url === undefined
                  ? `/item?id=${event.id}`
                  : formatPostContent(event.content).url}
                rel="noreferrer">{formatPostContent(event.content).title}</a
              ></span
            ></td
          ></tr
        >
        <tr
          ><td colspan="2" /><td class="subtext"
            ><span class="subline">
              by
              <a href={`nostr:${event?.pubkey}`} class="hnuser"
                >{#await getProfile(event.pubkey)}loading{:then result}{result
                    .profile.name}{/await}</a
              >
              <span class="age" title="2023-07-14T12:19:41"
                ><a href="">{dateFormatter(event?.created_at)}</a></span
              > <span id="unv_36722823" /> |
              <a href="#hide">hide</a>
              | <a href="">{comments.size} comments</a>
            </span>
            {#if formatPostContent(event.content).text}
            <div style="margin-top:14px;color:black;" class="comment">
              <div>
                <SvelteMarkdown source={formatPostContent(event.content).text?.replace(/\n/g, "\n\n")} />
              </div>
            </div>
            {/if}
          </td>
          </tr
        >
        <tr style="height:10px" /><tr
          ><td colspan="2" /><td
            ><form on:submit|preventDefault={addCommentHandler}>
              <textarea
                bind:value={commentContent}
                required
                name="text"
                rows="8"
                cols="80"
                wrap="virtual"
              /><br /><br />
              <input type="submit" value="add comment" />
            </form></td
          ></tr
        >
      </tbody>
    </table>
    <br /><br />

    <table border="0" class="comment-tree">
      <tbody>
        {#each comments as comment}
          <Comment above={event} event={comment} ind={0} />
        {/each}
      </tbody>
    </table>
    <br /><br />
  </td>
{/if}

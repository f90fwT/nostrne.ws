<script lang="ts">
  import { goto } from "$app/navigation";
  import { getComments, ndk } from "$lib/nostr";
  import {
    dateFormatter,
    formatPostContent,
    removeDuplicateComments,
  } from "$lib/utils";
  import "../../styles/hackernews.css";
  import { onMount } from "svelte";

  export const prerender = true;

  onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    let id: string | null = urlParams.get("id");

    if (id === null) {
      goto("/")
    } else {
      goto(`/item/${id}`);
    }
  });
</script>

<p>Loading...</p>
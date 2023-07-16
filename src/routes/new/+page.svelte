<script lang="ts">
    import { newPost } from "$lib/nostr";
    import "../../styles/hackernews.css";

    let title: string = "";
    let url: string = "";
    let text: string = "";

    const submitHandler = async () => {
        if (title === "") {
            return alert("Missing title");
        }
        if (url === "" && text === "") {
            return alert("missing url or/and text1");
        }
        if (url === "" && text !== "") {
            return alert("missing url or/and text2");
        }
        if (url !== "" && text === "") {
            return alert("missing url or/and text3");
        }

        const result = await newPost({ title, url, text });

        title = "";
        url = "";
        text = "";

        if (result === false) {
            alert("Something went wrong while submitting post, note that we only support nip07 at this moment");
        } else if (result === true) {
            alert("Success!")
        }
    }
</script>

<td>
    <form on:submit|preventDefault={submitHandler}>
        <table border="0">
            <tbody
                ><tr
                    ><td>title</td><td
                        ><input
                            required
                            bind:value={title}
                            type="text"
                            name="title"
                            size="50"
                        /><span style="margin-left:10px" /></td
                    ></tr
                ><tr
                    ><td>url</td><td
                        ><input bind:value={url} type="url" name="url" size="50" /></td
                    ></tr
                ><tr
                    ><td>text</td><td
                        ><textarea
                            name="text"
                            bind:value={text}
                            rows="4"
                            cols="49"
                            wrap="virtual"
                        /></td
                    ></tr
                ><tr><td /><td /></tr><tr
                    ><td /><td><input type="submit" value="submit" /></td></tr
                ><tr style="height:20px" /><tr
                    ><td /><td
                        >Leave url blank to submit a question for discussion. If
                        there is no url, text will appear at the top of the
                        thread. If there is a url, text is optional.<br /><br />
                        </td
                    ></tr
                ></tbody
            >
        </table>
    </form></td
>

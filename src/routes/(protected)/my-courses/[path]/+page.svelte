<script lang="ts">
	import { page } from '$app/stores'
	import Button from '$lib/components/common/Button.svelte'

	let value = $state('')
	let highlightedValue = $derived(
		value.replace(/(\b(?:const|let|var|function|if|else|while|for|return)\b)/g, '<span class="keyword">$1</span>'),
	)
	let output = $state('')

	function handleSubmit() {
		const frame = document.createElement('iframe')
		document.body.appendChild(frame)

		// Listen for messages from the iframe
		window.addEventListener('message', event => {
			if (event.source === frame.contentWindow) {
				if (event.data.type === 'log') {
					output = event.data.data + '\n'
				} else if (event.data.type === 'result') {
					output = 'Result: ' + event.data.data + '\n'
				}
			}
		})

		// Execute the code in the iframe
		frame.contentWindow?.eval(`
      (function() {
        const output = [];

        // Redirect console logs to the parent window
        console.log = function(...args) {
          output.push(args.join(' '));
          parent.postMessage({ type: 'log', data: args.join(' ') }, '*');
        };

        // Execute the code and send the result to the parent window
        const result = eval(${value});
        parent.postMessage({ type: 'result', data: result }, '*');

        return output;
      })();
    `)

		// Remove the iframe after a short delay (adjust as needed)
		setTimeout(() => {
			document.body.removeChild(frame)
		}, 1000)
	}
</script>

<div class="flex flex-col w-full p-4 gap-y-5 grow">
	<div class="flex items-center gap-x-4">
		<div class="text-3xl font-semibold">{$page.params.path} Course</div>
		<Button color="red" label="Submit" onclick={handleSubmit} />
	</div>
	<div class="flex grow gap-x-3">
		<textarea bind:value class="w-1/3 px-2 focus:outline-none py-0.5" />
		<div class="w-1/3 bg-ice-light">{highlightedValue}</div>
		<div class="w-1/3 bg-ice-main grow">{output}</div>
	</div>
</div>

<style>
	.keyword {
		color: blue;
	}
</style>

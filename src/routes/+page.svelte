<script lang="ts">
  import Countdown from "$lib/components/Countdown.svelte";
  import { checkFinished, checkRunning } from "./stores.js";

  let date: string = "";
  let time: string = "";
  let targetDate: string = "";
  let isError: boolean = false;
  let isSuccessful: boolean = false;
  let eventName: string = "";
  let hideForm: boolean = false;

  let isFinished: boolean = false;
  $: isFinished = $checkFinished;

  let isRunning: boolean = false;
  $: isRunning = $checkRunning;

  async function setTargetDate() {
    if (!date || !time || !eventName) {
      isError = true;
      return;
    }
    isSuccessful = true;
    checkRunning.update(() => true);
    isError = false;
    hideForm = true;
    targetDate = `${date}T${time}`;

    // Remove the toast after 5 seconds
    setTimeout(() => {
      isSuccessful = false;
    }, 5000);
  }

  function clearAll() {
    window.location.reload();
  }
</script>

<main class="flex min-h-screen items-center justify-center bg-gradient-to-r from-black to-gray-900 text-white p-8 rounded-lg h-screen">
  <div class="mb-4 flex flex-col space-y-4 w-68 mx-auto">

    {#if !hideForm}
      <h1 class="text-5xl mb-8 text-center">Countdown <span style="color: red; font-weight: bold">Timer</span></h1>
      <label for="eventName" class="block text-sm font-medium">Event Name</label>
      <div class="relative rounded-md shadow-sm">
        <input
          type="text"
          disabled={isRunning}
          bind:value={eventName}
          class="form-input block w-full py-2 px-3 rounded-md bg-gray-800 text-white"
          placeholder="Graduation..."
        />
      </div>

      <div class="flex justify-between">
        <div>
          <label for="date" class="block text-sm font-medium mb-4">Date</label>
          <div class="relative rounded-md shadow-sm">
            <input
              disabled={isRunning}
              type="date"
              bind:value={date}
              class="form-input block w-full py-2 px-3 rounded-md bg-gray-800 text-white"
            />
          </div>
        </div>

        <div>
          <label for="time" class="block text-sm font-medium mb-4">Time</label>
          <div class="relative rounded-md shadow-sm">
            <input
              disabled={isRunning}
              type="time"
              bind:value={time}
              class="form-input block w-full py-2 px-3 rounded-md bg-gray-800 text-white"
            />
          </div>
        </div>
      </div>

      {#if isError}
        <div class="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg >
          <span>Missing information.</span>
        </div>
      {/if}

      <button disabled={isRunning} on:click={setTargetDate} class="btn btn-primary w-full">Start Countdown</button>
    {/if}

    {#if hideForm}
      {#if isRunning}
        <h2 class="text-5xl mb-4 text-center">Time until, <span class="text-red-600">{eventName}.</span></h2>
      {:else}
        <h2 class="text-5xl mb-4 text-center">Time for, <span class="text-red-600">{eventName}.</span></h2>
      {/if}
    
      <Countdown {targetDate} {eventName} />
      <button on:click={clearAll} class="btn btn-secondary w-full">Reset</button>
    {/if}

  </div>
</main>

{#if isSuccessful}
  <div class="toast">
    <div class="alert alert-success">
      <span>Countdown set successfully!</span>
    </div>
  </div>
{/if}

<p class="absolute bottom-3 right-3 text-gray-500 select-none">Find other projcts <a target="_blank" style="color: red;" href="https://github.com/berkanktk/projects">here</a>.</p>
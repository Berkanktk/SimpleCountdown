<script lang="ts">
  import Countdown from "$lib/components/Countdown.svelte";
  
  let date: string = "";
  let time: string = "";
  let targetDate: string = "";
  let isError: boolean = false;
  let isSuccessful: boolean = false;

  async function setTargetDate() {
    if (!date || !time) {
      isError = true;
      return;
    }
    isSuccessful = true;
    targetDate = `${date}T${time}`;
    
    // Remove the toast after 5 seconds
    setTimeout(() => {
      isSuccessful = false;
    }, 5000);
  }
</script>

<main class="min-h-screen items-center justify-center bg-gradient-to-r from-black to-gray-900 text-white p-8 rounded-lg">
  
  <div class="mb-4 flex flex-col space-y-4 w-1/2 mx-auto">
    <h1 class="text-5xl mb-4">Countdown</h1>
    <div class="relative rounded-md shadow-sm">
      <input
        type="date"
        bind:value={date}
        class="form-input block w-full py-2 px-3 rounded-md bg-gray-800 text-white"
      />
    </div>
    <div class="relative rounded-md shadow-sm">
      <input
        type="time"
        bind:value={time}
        class="form-input block w-full py-2 px-3 rounded-md bg-gray-800 text-white"
      />
    </div>
    
    {#if isError}
      <div class="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Enter date and time.</span>
      </div>
    {/if}

    <button on:click={setTargetDate} class="btn btn-primary w-full">Set Countdown</button>
  </div>

  {#if isSuccessful}
    <div class="toast">
      <div class="alert alert-success">
        <span>Countdown set successfully!</span>
      </div>
    </div>
  {/if}
  
  {#if targetDate}
    <Countdown {targetDate} />
  {/if}
</main>

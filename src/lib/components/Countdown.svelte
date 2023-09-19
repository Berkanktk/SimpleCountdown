<script lang="ts">
  import { onMount } from "svelte";
  import {
    FallingConfetti,
    ConfettiBurst,
    ConfettiCannon,
    random,
  } from "svelte-canvas-confetti";
  import { checkFinished, checkRunning } from "../../routes/stores.js";

  export let targetDate: string;
  export let eventName: string;

  let days: number = 0;
  let hours: number = 0;
  let minutes: number = 0;
  let seconds: number = 0;
  let isFinished: boolean = false;

  onMount(() => {
    const interval = setInterval(() => {
      const now: Date = new Date();
      const target = new Date(targetDate);
      const diff: number = target.getTime() - now.getTime();

      days = Math.floor(diff / (1000 * 60 * 60 * 24));
      hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (diff <= 0) {
        isFinished = true;
        checkFinished.update(() => true);
        checkRunning.update(() => false);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  });
</script>

<div class="p-8 rounded-lg self-center">
  {#if isFinished}
    <div class="text-4xl text-center">
      <ConfettiCannon
        origin={[window.innerWidth / 2, window.innerHeight]}
        angle={-90}
        spread={35}
        force={35}
      />
      <FallingConfetti particleCount={100} />
      <ConfettiBurst
        origin={[
          random((window.innerWidth / 4) * 3, window.innerWidth / 4),
          random((window.innerHeight / 4) * 3, window.innerHeight / 4),
        ]}
      />
    </div>
  {/if}

  <div class="grid grid-flow-col gap-5 text-center auto-cols-max">
    <div class="flex flex-col">
      <span class="countdown font-mono text-5xl">
        <span style="--value:{isFinished ? 0 : days};" />
      </span>
      days
    </div>
    <div class="flex flex-col">
      <span class="countdown font-mono text-5xl">
        <span style="--value:{isFinished ? 0 : hours};" />
      </span>
      hours
    </div>
    <div class="flex flex-col">
      <span class="countdown font-mono text-5xl">
        <span style="--value:{isFinished ? 0 : minutes};" />
      </span>
      min
    </div>
    <div class="flex flex-col">
      <span class="countdown font-mono text-5xl">
        <span style="--value:{isFinished ? 0 : seconds};" />
      </span>
      sec
    </div>
  </div>
</div>

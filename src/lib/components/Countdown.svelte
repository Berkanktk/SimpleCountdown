<script lang="ts">
    import { onMount } from 'svelte';
	import {FallingConfetti, ConfettiBurst, ConfettiCannon, random} from 'svelte-canvas-confetti';


    export let targetDate: string;
  
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
          clearInterval(interval);
        }
      }, 1000);
  
      return () => clearInterval(interval);
    });
  </script>
  
  <div class="bg-gradient-to-r from-black to-gray-900 text-white p-8 rounded-lg">
    {#if isFinished}
      <div class="text-4xl text-center">
        Congratz!
        <ConfettiCannon
		origin={[window.innerWidth / 2, window.innerHeight]}
		angle={-90}
		spread={35}
		force={35}
	/>
        <FallingConfetti particleCount={100} />
        <ConfettiBurst 
            origin={[
                    random(window.innerWidth / 4 * 3, window.innerWidth / 4), 
                    random(window.innerHeight / 4 * 3, window.innerHeight / 4)
                ]} 
            />
      </div>
    {:else}
      <div class="text-4xl text-center">
        {days} Days {hours} Hours {minutes} Minutes {seconds} Seconds
      </div>
    {/if}
  </div>
  
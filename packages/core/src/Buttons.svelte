<script>
    import {getContext} from 'svelte';
    import {createDate, cloneDate, setContent, setMidnight, nextDate, prevDate} from './lib.js';

    export let buttons;

    let {_currentRange, _viewTitle, buttonText, customButtons, date, duration, hiddenDays, theme, view, calendarHeader} = getContext('state');

    let today = setMidnight(createDate()), isToday;

    $: isToday = today >= $_currentRange.start && today < $_currentRange.end || null;

    function prev() {
        $date = prevDate($date, $duration, $hiddenDays);
    }

    function next() {
        $date = nextDate($date, $duration);
    }
</script>

{#each buttons as button}
    {#if button == 'title'}
        <!-- svelte-ignore a11y-missing-content -->
        <div class="{$theme.title}" use:setContent={$_viewTitle}></div>
    {:else if button == 'header'}
        <svelte:element this={$calendarHeader.tag} class="{$theme.calendarHeader}">
            {$calendarHeader.value}
        </svelte:element>
    {:else if button == 'prev'}
        <button
            type="button"
            class="{$theme.button} ec-{button}"
            aria-label={$buttonText.prev}
            title={$buttonText.prev}
            on:click={prev}
        ><i class="{$theme.icon} ec-{button}"></i></button>
    {:else if button == 'next'}
        <button
            type="button"
            class="{$theme.button} ec-{button}"
            aria-label={$buttonText.next}
            title={$buttonText.next}
            on:click={next}
        ><i class="{$theme.icon} ec-{button}"></i></button>
    {:else if button == 'today'}
        <button
            type="button"
            class="{$theme.button} ec-{button} {isToday ? $theme.active : ''}"
            on:click={() => $date = cloneDate(today)}
        >{$buttonText[button]}</button>
    {:else if $customButtons[button]}
        <button
            type="button"
            class="{$theme.button} ec-{button}{$customButtons[button].active ? ' ' + $theme.active : ''}"
            on:click={$customButtons[button].click}
            use:setContent={$customButtons[button].text}
        ></button>
    {:else if button != ''}
        <button
            type="button"
            class="{$theme.button}{$view === button ? ' ' + $theme.active : ''} ec-{button}"
            on:click={() => $view = button}
        >{$buttonText[button]}</button>
    {/if}
{/each}

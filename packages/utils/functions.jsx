export function shortenString(str) {
    if (!str) return;
    if (str.length <= 11) {
        return str;
    } else {
        let firstPart = str.substring(0, 8);
        let lastPart = str.substring(str.length - 4);
        return `${firstPart}...${lastPart}`;
    }
}



export async function copyToClipboard(text) {
    if (!navigator.clipboard) {
        // Clipboard API not available
        return;
    }

    try {
        await navigator.clipboard.writeText(text);
        alert("id copied")
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}


export const dummySafeData = [
    {

        owner: "hh",
        amount: 20000000000000000000,
        releaseTime: 1710308379,
        withdrawn: false


    },
    {

        owner: "gggt",
        amount: 920000000000000000000,
        releaseTime: 1710308379,
        withdrawn: false


    },
    {

        owner: "hu",
        amount: 120000000000000000000,
        releaseTime: 1710308379,
        withdrawn: false

    },
    {

        owner: "yuhh",
        amount: 150000000000000000000,
        releaseTime: 1715337114,
        withdrawn: true


    }

]


export function getFullDateFromSeconds(unixNano) {
    const unixMilli = Math.floor(unixNano * 1000)
    const date = new Date(unixMilli)
    return date.toLocaleString()
  }
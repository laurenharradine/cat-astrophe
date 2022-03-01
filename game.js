const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('options-btn')

let state = {}

function startGame(){
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    text.innerHTML = textNode.text

    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption (option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
   // return true;
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: "You wake up in a small cage on a bed of old ragged blankets.  It is very dark, but with your cat vision you can see quite easily. There's a bowl of food and water and a toy ball next to your bed. You can hear snuffles and squeaks echoing through the room. The air is pungent with the scent of other animals.",
        options: [
            {
                text: "Take the ball",
                requiredState: (currentState) => !(currentState.goo),
                setState: {goo: true },
                nextText: 2,
            },
            {
                text: "Go to the cage door",
                nextText: 3,

            }
        ]
    },
    {
        id: 3,
        text: "You notice another cat in a cage of its own across the room. It has a lockpick! Whaaat!",
        options: [
            {
                text: "Meow loudly",
                nextText: 4,
            },
            {
                text: "Trade the ball for the lockpick",
                requiredState: (currentState) => currentState.goo,
                setState: {goo: false, lockpick: true},
                nextText: 5,
            },
            {
                text: "Examine the cage door",
                nextText: 5,
            },
        ],
    },
    {
        id: 2,
        text: "OK, you take the ball and put in your, err, bag...?",
        options: [
            {
                text: "Go to the cage door",
                nextText: 3,
            }
        ]
    },
    {
        id: 4,
        text: "You become so worn out from meowing that you fall asleep, and don't notice when a dragon comes up and kills you!!!",
        options: [
            {
                text: 'Restart',
                nextText: -1,
            }
        ],
    },
    {
        id: 5,
        text: "You look more closely at the cage door. You see a lock, and on the outside of the door you notice a latch that appears to be activated by moving it up and down. You could probably reach it with your paw through the bars of the cage...",
        options: [
            {
                text: "Meow loudly",
                nextText: 4,
            },
            {
                text: "Pick the lock",
                requiredState: (currentState) => currentState.lockpick,
                //setState: {goo: false, lockpick: true},
                nextText: 6,
            },
            {
                text: "Play with the latch!",
                nextText: 7,
            },
        ]
    },
    {
        id: 7,
        text: "",
    }

]

startGame()
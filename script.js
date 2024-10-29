colors = [
    "#FF7A00",
    "#9327FF",
    "#6E52FF",
    "#FC71FF",
    "#FFBB2B",
    "#1FD7C1",
    "#462F8A",
    "#FF4646",
    "#00BEE8",
    "#FF7A00"
]

function getRandomColor() {
    const randomColor = colors[(Math.round(Math.random() * (colors.length - 1)))];
    return randomColor;
}
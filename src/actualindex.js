(() => {
    document.getElementById('pleaseColor').style.visibility = 'hidden'
    document.getElementById('pleaseColor2').style.visibility = 'hidden'
    document.getElementById('bestrange').style.backgroundColor = 'rgb(78, 255, 78)'
})()

let firstStringVal;
let firstSplittedStringVal;

let secondStringVal
let secondSplittedStringVal
let linesMatched = 0

let firstDivTextAreaVal
let secondDivTextAreaVal
let searchRange
let rangeToggle = 'bestrange'

function changeRangeToggle()
{
    let rangeVal = parseInt(document.getElementById('searchRange').value)
    if (rangeVal > 0) {
        rangeToggle = 'customizedrange'
        document.getElementById('customizerange').style.backgroundColor = 'rgb(78, 255, 78)'
        document.getElementById('bestrange').style.backgroundColor = 'rgb(115, 248, 115)'
    }
}

document.getElementById('customizerange').addEventListener('click', () => {
    document.getElementById('searchRange').style.visibility = 'visible'
    let rangeVal = parseInt(document.getElementById('searchRange').value)
    if (rangeVal > 0) rangeToggle = 'customizedrange'
})

document.getElementById('bestrange').addEventListener('click', () => {
    document.getElementById('bestrange').style.backgroundColor = 'rgb(78, 255, 78)'
    document.getElementById('customizerange').style.backgroundColor = 'rgb(115, 248, 115)'
    rangeToggle = 'bestrange'
})

document.getElementById('differencebutton').addEventListener("click", () => {
    firstDivTextAreaVal = document.getElementById('firstDivTextArea').childNodes
    secondDivTextAreaVal = document.getElementById('secondDivTextArea').childNodes
    if (rangeToggle == 'bestrange')
    {
        searchRange = firstDivTextAreaVal.length
    }
    else {
    searchRange = document.getElementById('searchRange').value
    }
    
    LinesMatcher()
})

function LinesMatcher() {
    
    let skippedFirstElementArrayFirstBox = []
    let skippedFirstElementArraySecondBox = []
    let tempSkippedFirstElementArrayFirstBox = []
    let tempSkippedFirstElementArraySecondBox = []
    firstDivTextAreaVal.forEach((e, index) => { if (e.nodeName != '#text' || index == 0) tempSkippedFirstElementArrayFirstBox.push(e) })
    secondDivTextAreaVal.forEach((e, index) => { if (e.nodeName != '#text' || index == 0) tempSkippedFirstElementArraySecondBox.push(e) })

    tempSkippedFirstElementArrayFirstBox.map((e, index) => {
        if (e.nodeName != '#text')
        {
        if (e.childElementCount > 0)
        {
            if (e.innerText == '\n')
            {
                return
            }
            e.childNodes.forEach(e => {
                skippedFirstElementArrayFirstBox.push(e)
            })
            return e
        }
        }
            skippedFirstElementArrayFirstBox.push(e)
            return e  
    })
    tempSkippedFirstElementArraySecondBox.map((e, index) => {
        if (e.nodeName != '#text')
        {
        if (e.childElementCount > 0)
        {
            if (e.innerText == '\n')
            {
                return
            }
            e.childNodes.forEach(e => {
                skippedFirstElementArraySecondBox.push(e)
            })
            return e
        }
        }
         skippedFirstElementArraySecondBox.push(e)
            return e  
    })
    
    let [firstBoxComparableLines,firstBoxComparableLinesArray,firstBoxComparableLinesPosition] = GetNumberOfLinesWithoutSpace(skippedFirstElementArrayFirstBox)
    firstBoxComparableLinesArray = firstBoxComparableLinesArray.map(e => { if(e != undefined) return e.trim() })

    let [secondBoxComparableLines,secondBoxComparableLinesArray,secondBoxComparableLinesPosition] = GetNumberOfLinesWithoutSpace(skippedFirstElementArraySecondBox)
    secondBoxComparableLinesArray = secondBoxComparableLinesArray.map(e => { if(e != undefined) return e.trim() })
   
    let followingLineNumber = 0
    

        if (firstDivTextAreaVal[0].nodeName = '#text' && secondDivTextAreaVal[0].nodeName =='#text') 
        {
            if (firstDivTextAreaVal[0].nodeValue == secondDivTextAreaVal[0].nodeValue)
            {
               let colorFirstElement = document.getElementById('pleaseColor')
               let setColorVisibility = document.getElementById('pleaseColor').style.visibility
               if (setColorVisibility == 'visible') colorFirstElement.style.visibility = 'hidden'
               if (setColorVisibility == 'hidden') colorFirstElement.style.visibility = 'visible'

               let colorFirstElement2 = document.getElementById('pleaseColor2')
               let setColorVisibility2 = document.getElementById('pleaseColor2').style.visibility
               if (setColorVisibility2 == 'visible') colorFirstElement2.style.visibility = 'hidden'
               if (setColorVisibility2 == 'hidden') colorFirstElement2.style.visibility = 'visible'
            }
        }

    for (let i = 0; i < firstBoxComparableLines; i++)
    {
        
        let secondBoxFirstLineColor;
        if (i < firstBoxComparableLines)
        if (skippedFirstElementArrayFirstBox[firstBoxComparableLinesPosition[i]].nodeName == '#text') {
            followingLineNumber++
            continue
        }
        if (i < secondBoxComparableLines)
        if (skippedFirstElementArraySecondBox[secondBoxComparableLinesPosition[i]].nodeName == '#text') {
            followingLineNumber++
            continue
        }
        firstBoxCurrentLine = skippedFirstElementArrayFirstBox[firstBoxComparableLinesPosition[i]]
        if (i < secondBoxComparableLines){
        secondBoxCurrentLine = skippedFirstElementArraySecondBox[secondBoxComparableLinesPosition[i]]       
        } else {
        secondBoxCurrentLine = skippedFirstElementArraySecondBox[secondBoxComparableLinesPosition[1]]
        followingLineNumber = 1
        }

        let searchRangeCopy = +searchRange
        let followingLineNumberCopy = followingLineNumber
        followingLine = skippedFirstElementArraySecondBox[secondBoxComparableLinesPosition[followingLineNumberCopy]]
        let loopBreaker = 1
   
        while (followingLine.innerText.trim() != firstBoxCurrentLine.innerText.trim())
        {
            
            if (followingLineNumberCopy == secondBoxComparableLines-1)
            {
                break
            }
            if (loopBreaker < searchRangeCopy)
            {
                ++followingLineNumberCopy
                followingLine = skippedFirstElementArraySecondBox[secondBoxComparableLinesPosition[followingLineNumberCopy]]
                
            }
            else {
                break
            }
            ++loopBreaker
        }

        if (followingLine.innerText.trim() != firstBoxCurrentLine.innerText.trim()) {
            followingLineNumberCopy = followingLineNumber
            loopBreaker = 1
        while (followingLine.innerText.trim() != firstBoxCurrentLine.innerText.trim())
        {

            if (followingLineNumberCopy == 0)
            {
                    if (skippedFirstElementArraySecondBox[secondBoxComparableLinesPosition[0]].nodeName == '#text') {
                        followingLine.innerText = skippedFirstElementArraySecondBox[secondBoxComparableLinesPosition[0]].nodeValue
                        if (followingLine.innerText.trim() == firstBoxCurrentLine.innerText.trim())
                        {
                            secondBoxFirstLineColor = skippedFirstElementArraySecondBox[secondBoxComparableLinesPosition[0]]
                            break
                        }
                    }
                
            }

            if (followingLineNumberCopy == 0)
            {
                break
            }

            if (loopBreaker < searchRangeCopy)
            {
            --followingLineNumberCopy
            followingLine = skippedFirstElementArraySecondBox[secondBoxComparableLinesPosition[followingLineNumberCopy]]
            
            }
            else {
                break
            }
            ++loopBreaker
        }
        }

        if (followingLineNumberCopy == 0) {
        if (followingLine.innerText.trim() != firstBoxCurrentLine.innerText.trim())
            {
                if (skippedFirstElementArraySecondBox[0].nodeName == '#text')
                {
                    followingLine.innerText = skippedFirstElementArraySecondBox[0].nodeValue
                    
                }
            }}

        if (followingLineNumber != i) {
        if (followingLine.innerText.trim() != firstBoxCurrentLine.innerText.trim()) {
            if (i < secondBoxComparableLines)
            {
            let originalIndexIncrementCopy = i
            followingLine = skippedFirstElementArraySecondBox[secondBoxComparableLinesPosition[originalIndexIncrementCopy]]
            
            loopBreaker = 1
        while (followingLine.innerText.trim() != firstBoxCurrentLine.innerText.trim())
        {
            if (originalIndexIncrementCopy == secondBoxComparableLines-1)
            {
                break
            }
            if (loopBreaker <= searchRangeCopy)
            {
            ++originalIndexIncrementCopy
            followingLine = skippedFirstElementArraySecondBox[secondBoxComparableLinesPosition[originalIndexIncrementCopy]]
            
            }
            else {
                break
            }
            ++loopBreaker
        }
        }
        }
        }

        if (secondBoxFirstLineColor != undefined)
        {
           let checkVisibility = document.getElementById('pleaseColor2').style.visibility
           if (checkVisibility == 'hidden') checkVisibility = 'visible'
           if (checkVisibility == 'visible') checkVisibility = 'hidden'
        }

        if (followingLine.innerText.trim() == firstBoxCurrentLine.innerText.trim())
        {
            if (followingLineNumberCopy != secondBoxComparableLines-1)
            {
            followingLineNumber = followingLineNumberCopy + 1
            }
            else {

            followingLineNumber = 1
            }
            firstBoxCurrentLine.style.backgroundColor = "rgba(66, 245, 108, 0.8)"
            followingLine.style.backgroundColor = "rgba(66, 245, 108, 0.8)"
        }
        else {
            if (followingLineNumberCopy != secondBoxComparableLines-1)
            {
            followingLineNumber = i+1
            }
            else {
                followingLineNumber = 1
            }
        }
    }
}

function GetNumberOfLinesWithoutSpace(arrayOfLines) {

    let singleComment = /^\/\//
    let multiCommentStartPattern = /^\/\*/
    let multiCommentEndPattern = /\*\/$/
    let unEmptyLines = 0;
    let currentLineNumer = 0;
    let numberOfLines = arrayOfLines.length
    let unEmptyLinesArray = []
    let unEmptyLinesPositions = []

    for (let i=0; i < numberOfLines && currentLineNumer < numberOfLines ; i++) {
        currentLine = arrayOfLines[currentLineNumer].innerText

        if (currentLine != undefined) currentLine = currentLine.trim()

        while (singleComment.test(currentLine))
        {
            if (currentLineNumer == numberOfLines-1)
            {
                break
            }
            currentLineNumer++
            currentLine = arrayOfLines[currentLineNumer].innerText
            
        }

        while (multiCommentStartPattern.test(currentLine))
        {
            if (multiCommentEndPattern.test(currentLine))
            {
                if (currentLineNumer == numberOfLines-1)
                {
                    break
                }
                currentLineNumer++
                currentLine = arrayOfLines[currentLineNumer].innerText

                continue
            }
            while (!multiCommentEndPattern.test(currentLine))
            {
                if (currentLineNumer == numberOfLines-1)
                {
                    break
                }
                currentLineNumer++
                currentLine = arrayOfLines[currentLineNumer].innerText
            }
            if (currentLineNumer == numberOfLines-1)
            {
                break
            }
            currentLineNumer++
            currentLine = arrayOfLines[currentLineNumer].innerText
            while (singleComment.test(currentLine))
            {
                if (currentLineNumer == numberOfLines-1)
                {
                    break
                }
                currentLineNumer++
                currentLine = arrayOfLines[currentLineNumer].innerText
            }

        }

        if (currentLine != '\n' && currentLineNumer != numberOfLines)
        {

            unEmptyLines++
            unEmptyLinesArray.push(currentLine)
            unEmptyLinesPositions.push(currentLineNumer)
        }
       if (currentLineNumer < numberOfLines)
        {
            currentLineNumer++
        }
    }

    return [unEmptyLines, unEmptyLinesArray, unEmptyLinesPositions]
}
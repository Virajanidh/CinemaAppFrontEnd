function handleBeforeUnload(event) {
    event.preventDefault();
    event.returnValue = '';
  }

export default handleBeforeUnload;
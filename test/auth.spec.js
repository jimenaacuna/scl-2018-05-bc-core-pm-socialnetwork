describe('auth', () => {
    it('debería ser una funcion', () => {
        assert.isFunction(logoutWithFireBase);
    });

    it('debería exponer función sortUsers en objeto global', () => {
        assert.isFunction(facebookLoginwithFireBase);
    });


});
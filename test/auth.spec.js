describe('auth', () => {
    it('debería ser una funcion', () => {
        assert.isFunction(logoutWithFireBase);
    });

    it('debería exponer función sortUsers en objeto global', () => {
        assert.isFunction(facebookLoginwithFireBase);
    });

});

describe('publicar', () => {
    it('debería existir datos que no sean NULL or UNDEFINED', () => {
        assert.exists(publicar, 'publicar is neither `null` nor `undefined`');
    });
})
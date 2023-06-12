export default function reflect(self: Window | any) {
    const _set = self.Reflect.set.bind({});
    const _get = self.Reflect.get.bind({});

    self.Reflect.set = self.__dynamic.wrap(self.Reflect.set,
        function(this: any, target: any, ...a: any) {
            if (!a[0]) console.log(a);
            if (a[0].constructor.name=='Window') {
                if (a[1]=='location') {
                    a[0].__dynamic$location = a[2];
                    return true;
                }
            }

            if (a[0].constructor.name=='Location') {
                self.__dynamic$location[a[1]] = a[2];
                return true;
            }
            
            return _set.apply(this, a);
        },
        'Reflect.set'
    );

    self.Reflect.get = self.__dynamic.wrap(self.Reflect.get,
        function(this: any, target: any, ...a: any) {
            if (!a[0]) console.log(a);
            if (typeof a[0] == 'object') {
                if (a[0].constructor.name=='Window') {
                    if (a[1]=='location') return a[0].__dynamic$location;

                    if (a[0][a[1]].constructor.name=='Window') {
                        return a[0][a[1]].__dynamic$window;
                    }
                }

                if (a[0].constructor.name=='Location') {
                    return self.__dynamic$location[a[1]];
                }
            }

            return _get.apply(this, a);
        },
        'Reflect.get'
    );

    self.__dynamic.Reflect = {
        get: _get,
        set: _set,
        apply: self.Reflect.apply.bind({}),
        construct: self.Reflect.construct.bind({}),
        defineProperty: self.Reflect.defineProperty.bind({}),
        deleteProperty: self.Reflect.deleteProperty.bind({}),
        getOwnPropertyDescriptor: self.Reflect.getOwnPropertyDescriptor.bind({}),
        getPrototypeOf: self.Reflect.getPrototypeOf.bind({}),
        has: self.Reflect.has.bind({}),
        isExtensible: self.Reflect.isExtensible.bind({}),
        ownKeys: self.Reflect.ownKeys.bind({}),
        preventExtensions: self.Reflect.preventExtensions.bind({}),
        setPrototypeOf: self.Reflect.setPrototypeOf.bind({})
    }
}
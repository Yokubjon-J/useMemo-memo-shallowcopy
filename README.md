# useMemo-memo-shallowcopy
Educational

This mini JavaScript (in ReactJS) project is, in my mind, very important despite it's being extremely tiny and without any visual appeal.

The main lesson here is about shallow equality. On line 12 (commented out) and 13 in App.jsx, there are 2 versions of a person object: the former is a plain object but
right now it will remain useless being commented out; in the latter version, it is memoized by being passed to useMemo.
This memoized version of person object is in turn passed to Profile component which is memoized by memo().

![image](https://user-images.githubusercontent.com/67240021/229955349-358a91fb-6438-4959-af83-9a1007211c90.png)
                             
App component has a state, which can be incremented only. This state is not used by any other component (i.e. not passed down as a prop), but, despite being so,
everytime we incremet the state, all the inner components will be re-rendered, except Profile.
Profile is saved from (unnecessarily) being re-rendered thanks to useMemo.

But if we comment out lines 13-16 and uncomment line 12, the situation radically changes: now Profile component will also be re-rendered as Page does EVEN THOUGH the
plain person object remains unchanged!!!(!) Why so? This is because on every re-render, person object is created anew. Despite being created anew, its properties
will not change and will always remain as they were before re-rendering. This begs the question of why then Profile is being re-rendered despite being already
memoized by memo()? Because each newly created person object instance will be located in different memory address i.e. each of them will be referencing a different
memory location and so they won't be pointing to the same address. So despite their values being the same, each pair of these newly created "seemingly" equal objects
will fail Object.is() test. Object.is() tests whether 2 objects are shallowly equal (i.e. reference the same memory location).

Whereas useMemo preserves the original person object by preventing it from being created anew. Even though its parent Page re-renders, person object will not be
recreated, it will stay 'intact' as it were before the re-render of Page, so it passess Object.is() test, i.e. its previous location in memory before the re-render
and the current location after the re-render will remain the same.

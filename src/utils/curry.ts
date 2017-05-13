// Yep, interfaces are stolen from ramda types
interface CurriedFunction2<T1, T2, R> {
  (t1: T1): (t2: T2) => R
  (t1: T1, t2: T2): R
}

interface CurriedFunction3<T1, T2, T3, R> {
  (t1: T1): CurriedFunction2<T2, T3, R>
  (t1: T1, t2: T2): (t3: T3) => R
  (t1: T1, t2: T2, t3: T3): R
}

interface CurriedFunction4<T1, T2, T3, T4, R> {
  (t1: T1): CurriedFunction3<T2, T3, T4, R>
  (t1: T1, t2: T2): CurriedFunction2<T3, T4, R>
  (t1: T1, t2: T2, t3: T3): (t4: T4) => R
  (t1: T1, t2: T2, t3: T3, t4: T4): R
}

interface CurriedFunction5<T1, T2, T3, T4, T5, R> {
  (t1: T1): CurriedFunction4<T2, T3, T4, T5, R>
  (t1: T1, t2: T2): CurriedFunction3<T3, T4, T5, R>
  (t1: T1, t2: T2, t3: T3): CurriedFunction2<T4, T5, R>
  (t1: T1, t2: T2, t3: T3, t4: T4): (t5: T5) => R
  (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): R
}

interface CurriedFunction6<T1, T2, T3, T4, T5, T6, R> {
  (t1: T1): CurriedFunction5<T2, T3, T4, T5, T6, R>
  (t1: T1, t2: T2): CurriedFunction4<T3, T4, T5, T6, R>
  (t1: T1, t2: T2, t3: T3): CurriedFunction3<T4, T5, T6, R>
  (t1: T1, t2: T2, t3: T3, t4: T4): CurriedFunction2<T5, T6, R>
  (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): (t6: T6) => R
  (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6): R
}

interface Curry {
  <T1, T2, TResult>(fn: (a: T1, b: T2) => TResult, args?: any): CurriedFunction2<T1,T2, TResult>
  <T1, T2, T3, TResult>(fn: (a: T1, b: T2, c: T3) => TResult, args?: any): CurriedFunction3<T1,T2, T3, TResult>
  <T1, T2, T3, T4, TResult>(fn: (a: T1, b: T2, c: T3, d: T4) => TResult, args?: any): CurriedFunction4<T1,T2, T3, T4, TResult>
  <T1, T2, T3, T4, T5, TResult>(fn: (a: T1, b: T2, c: T3, d: T4, e: T5) => TResult, args?: any): CurriedFunction5<T1,T2, T3, T4, T5, TResult>
  <T1, T2, T3, T4, T5, T6, TResult>(fn: (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6) => TResult, args?: any): CurriedFunction6<T1,T2, T3, T4, T5, T6, TResult>
  (fn: Function): Function
}

const curry: Curry = function() {
  const fn: Function = arguments[0]
  const length = fn.length

  const inner = function() {
    let args = Array.prototype.slice.call(arguments)

    if (args.length >= length) {
      return fn.apply(null, args)
    } else {
      return inner.bind.apply(inner, [null].concat(args))
    }
  }

  return inner.bind.apply(inner, [null].concat(Array.prototype.slice.call(arguments, 1)))
}

export { curry }

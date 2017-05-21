/* tslint:disable: only-arrow-functions max-line-length */
// Yep, interfaces are stolen from ramda types
interface ICurriedFunction2<T1, T2, R> {
  (t1: T1): (t2: T2) => R
  (t1: T1, t2: T2): R
}

interface ICurriedFunction3<T1, T2, T3, R> {
  (t1: T1): ICurriedFunction2<T2, T3, R>
  (t1: T1, t2: T2): (t3: T3) => R
  (t1: T1, t2: T2, t3: T3): R
}

interface ICurriedFunction4<T1, T2, T3, T4, R> {
  (t1: T1): ICurriedFunction3<T2, T3, T4, R>
  (t1: T1, t2: T2): ICurriedFunction2<T3, T4, R>
  (t1: T1, t2: T2, t3: T3): (t4: T4) => R
  (t1: T1, t2: T2, t3: T3, t4: T4): R
}

interface ICurriedFunction5<T1, T2, T3, T4, T5, R> {
  (t1: T1): ICurriedFunction4<T2, T3, T4, T5, R>
  (t1: T1, t2: T2): ICurriedFunction3<T3, T4, T5, R>
  (t1: T1, t2: T2, t3: T3): ICurriedFunction2<T4, T5, R>
  (t1: T1, t2: T2, t3: T3, t4: T4): (t5: T5) => R
  (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): R
}

interface ICurriedFunction6<T1, T2, T3, T4, T5, T6, R> {
  (t1: T1): ICurriedFunction5<T2, T3, T4, T5, T6, R>
  (t1: T1, t2: T2): ICurriedFunction4<T3, T4, T5, T6, R>
  (t1: T1, t2: T2, t3: T3): ICurriedFunction3<T4, T5, T6, R>
  (t1: T1, t2: T2, t3: T3, t4: T4): ICurriedFunction2<T5, T6, R>
  (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): (t6: T6) => R
  (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6): R
}

interface ICurry {
  <T1, T2, TResult>(fn: (a: T1, b: T2) => TResult, args?: any): ICurriedFunction2<T1, T2, TResult>
  <T1, T2, T3, TResult>(fn: (a: T1, b: T2, c: T3) => TResult, args?: any): ICurriedFunction3<T1, T2, T3, TResult>
  <T1, T2, T3, T4, TResult>(fn: (a: T1, b: T2, c: T3, d: T4) => TResult, args?: any): ICurriedFunction4<T1, T2, T3, T4, TResult>
  <T1, T2, T3, T4, T5, TResult>(fn: (a: T1, b: T2, c: T3, d: T4, e: T5) => TResult, args?: any): ICurriedFunction5<T1, T2, T3, T4, T5, TResult>
  <T1, T2, T3, T4, T5, T6, TResult>(fn: (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6) => TResult, args?: any): ICurriedFunction6<T1, T2, T3, T4, T5, T6, TResult>
}

const curry: ICurry = function () {
  const fn: (...args: any[]) => any = arguments[0]
  const length = fn.length

  const inner = function () {
    const args = Array.prototype.slice.call(arguments)

    if (args.length >= length) {
      return fn.apply(null, args)
    } else {
      return inner.bind.apply(inner, [null].concat(args))
    }
  }

  return inner.bind.apply(inner, [null].concat(Array.prototype.slice.call(arguments, 1)))
}

export { curry }

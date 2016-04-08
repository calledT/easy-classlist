var classList = require('.');
describe('classList(el)', function () {
  var el;

  beforeEach(function(){
    el = document.createElement('div');
  });

  it('should throw when the argument is not a DOM element', function () {
    expect(classList.bind(null)).toThrow();
    expect(classList.bind(null, 'str')).toThrow();
  });

  /**
   * .add()
   */

  describe('.add(string)', function () {
    it('should add a class', function () {
      classList(el).add('foo');
      expect(el.className).toBe('foo');
    });

    it('should not add the same class twice', function(){
      var list = classList(el);
      list.add('foo');
      list.add('foo');
      list.add('bar');
      expect(el.className).toBe('foo bar');
    });
  });

  /**
   * .remove()
   */

  describe('.remove(string)', function(){
    it('should remove a class from the beginning', function(){
      el.className = 'foo bar baz';
      classList(el).remove('foo');
      expect(el.className).toBe('bar baz');
    });

    it('should remove a class from the middle', function(){
      el.className = 'foo bar baz';
      classList(el).remove('bar');
      expect(el.className).toBe('foo baz');
    });

    it('should remove a class from the end', function(){
      el.className = 'foo bar baz';
      classList(el).remove('baz');
      expect(el.className).toBe('foo bar');
    });
  });

  /**
   * .toggle()
   */

  describe('.toggle(string)', function(){
    it('should remove the class if present', function(){
      el.className = 'foo bar hidden';
      classList(el).toggle('hidden');
      expect(el.className).toBe('foo bar');
    });

    it('should add the class if not present', function(){
      el.className = 'foo bar';
      classList(el).toggle('hidden');
      expect(el.className).toBe('foo bar hidden');
    });
  });

  describe('.toggle(string, force)', function(){
    describe('when force is true', function(){
      it('should add the class if missing', function(){
        el.className = 'foo bar';
        classList(el).toggle('hidden', true);
        expect(el.className).toBe('foo bar hidden');
      });

      it('should not remove the class if present', function(){
        el.className = 'foo bar hidden';
        classList(el).toggle('hidden', true);
        expect(el.className).toBe('foo bar hidden');
      });
    });

    describe('when force is false', function(){
      it('should remove the class if present', function(){
        el.className = 'foo bar hidden';
        classList(el).toggle('hidden', false);
        expect(el.className).toBe('foo bar');
      });

      it('should not add the class if missing', function(){
        el.className = 'foo bar';
        classList(el).toggle('hidden', false);
        expect(el.className).toBe('foo bar');
      });
    });
  });

  /**
   * .contains()
   */

  describe('.contains(string)', function(){
    it('should check if the class is present', function(){
      el.className = 'foo bar';
      var list = classList(el);
      expect(list.contains('foo')).toBe(true);
      expect(list.contains('bar')).toBe(true);
      expect(list.contains('baz')).toBe(false);
    });
  });

});

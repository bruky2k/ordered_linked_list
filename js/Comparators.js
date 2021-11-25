class Comparator {
    static compareInt(a, b) {
        a = parseInt(a);
        b = parseInt(b);

        //same type
        // if (typeof a === typeof b) {
        if (a > b) {
            return 1;
        }
        if (a < b) {
            return -1;
        }
        return 0;
        // }
    }

}

import re
import csv
lines = [x.split(',') for x in open('DB-Data.csv').read().split('\n')[1:-1]]
with open('DB-Data.csv', 'rb') as csvfile:
    lines = csv.reader(csvfile, delimiter=',', quotechar='"')
    fout = open('everyone.js', 'w')
    fout.write('var everyone = [\n')
    lines.next() # skip first line
    for entry in lines:
        entry = [(re.escape(x) if x != '\\N' else '') for x in entry]
        fout.write('  [\'')
        fout.write(entry[2] + '\', \'') # lname
        fout.write(entry[1] + '\', \'') # fname
        fout.write('' + '\', \'') # title
        fout.write(entry[0] + '\', \'') # kerb
        fout.write(entry[3] + '\', \'') # room
        fout.write(entry[5] + '\', \'') # year
        lounge = entry[17]
        if len(lounge) > 7:
            lounge = lounge[8:] # remove 'lounge-'
        fout.write(lounge + '\', \'') # lounge
        t = ''
        tr = entry[15]
        if tr == 'U':
            t = 'Undergraduate'
        elif tr == 'VS':
            t = 'Visiting Scholar'
        elif tr == 'HM':
            t = 'Housemaster'
        elif tr == 'GRT':
            t = 'GRT'
        elif tr == 'RLA':
            t = 'RLAD'
        elif tr == 'AHM':
            t = 'Housemaster (Assistant)'
        elif tr == 'OTHER':
            t = 'Other'
        fout.write(t + '\', \'') # type
        fout.write(entry[16] + '\', \'') # email
        fout.write(entry[18] + '\'') # title
        fout.write('],\n')
    fout.write(']\n')
    fout.close()
print 'Done'

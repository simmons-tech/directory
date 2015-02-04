import re
lines = [x.split(',') for x in open('DB-Data.csv').read().split('\n')[1:-1]]
fout = open('everyone.js', 'w')
fout.write('var everyone = [\n')
for entry in lines:
    entry = [(re.escape(x) if x != '\\N' else '') for x in entry]
    fout.write('  [\'')
    fout.write(entry[2] + '\', \'') # lname
    fout.write(entry[1] + '\', \'') # fname
    fout.write('' + '\', \'') # title
    fout.write(entry[0] + '\', \'') # kerb
    fout.write(entry[3] + '\', \'') # room
    fout.write(entry[4] + '\', \'') # year
    if len(entry[7]) > 7:
        entry[7] = entry[7][8:] # remove 'lounge-'
    fout.write(entry[7] + '\', \'') # lounge
    t = ''
    if entry[5] == 'U':
        t = 'Undergraduate'
    elif entry[5] == 'VS':
        t = 'Visiting Scholar'
    elif entry[5] == 'HM':
        t = 'Housemaster'
    elif entry[5] == 'GRT':
        t = 'GRT'
    elif entry[5] == 'RLA':
        t = 'RLAD'
    elif entry[5] == 'AHM':
        t = 'Housemaster (Assistant)'
    elif entry[5] == 'OTHER':
        t = 'Other'
    fout.write(t + '\', \'') # type
    fout.write(entry[6] + '\'],\n') # email
fout.write(']\n')
fout.close()

